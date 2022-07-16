import {
  BulbOutlined,
  HomeOutlined,
  LeftOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { observer } from 'mobx-react';
import { useState } from 'react';
import styled from 'styled-components';
import Bezier from '../../core/webGL/bezier';
import Shader from '../../core/webGL/shader';
import { useStore } from '../../stores';
import MyButton from '../MyButton';
import Style from './style';

let ctx: {
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  shader: Shader;
} | null = null;

const clamp = (max: number, min: number, value: number) =>
  Math.max(min, Math.min(value, max));

const initCtx = () => {
  const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  };
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, style);
  canvas.style.zIndex = '9000';
  const gl = canvas.getContext('webgl2', {
    premultipliedAlpha: true,
  }) as WebGL2RenderingContext;
  gl.clearColor(0, 0, 0, 0);
  const vs = `#version 300 es
precision mediump float;

layout(location = 0) in vec2 i_position;

out vec2 position;

void main() {
  position = i_position;
  gl_Position = vec4(position, 0., 1.);
}
`;
  const fs = `#version 300 es
precision mediump float;

uniform sampler2D screen;
uniform float aspect;
uniform float scale;
uniform float inside;
uniform float pct;
uniform vec2 center;

in vec2 position;
out vec4 fragColor;

void main() {
  vec2 p = vec2(position.x * aspect, position.y);
  float d = length(p - center);
  fragColor = vec4(vec3(pct), 1.);

  bool b_inside = inside > 0.5;
  float n_pct = b_inside ? 1. - pct : pct;
  bool transparent = d > n_pct * scale;
  if(b_inside ? transparent : !transparent) {
    fragColor = vec4(0., 0., 0., 0.);
  } else {
    vec2 uv = position / 2. + 0.5;
    uv.y = 1. - uv.y;
    fragColor = texture(screen, uv).bgra;
  }
}
`;
  const shaderInstance = new Shader({ gl, vs, fs });
  shaderInstance.use();

  const srcData = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
  const vertexArrayObject = gl.createVertexArray();
  const buffer = gl.createBuffer();

  gl.bindVertexArray(vertexArrayObject);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, srcData, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, true, 8, 0);
  return { canvas, gl, shader: shaderInstance };
};

const themeTransition = async (
  {
    buffer,
    width,
    height,
  }: { buffer: Uint8Array; width: number; height: number },
  focus: { left: number; width: number; top: number; height: number },
  theme: 'light' | 'dark'
) => {
  if (!ctx) {
    ctx = initCtx();
  }
  const { canvas, gl, shader } = ctx;
  const animationTime = 500;
  const aspect = width / height;
  const focusAxis = [
    focus.left + focus.width / 2,
    window.innerHeight - (focus.top + focus.height / 2),
  ];
  const center = [
    ((2 * focusAxis[0]) / window.innerWidth - 1) * aspect,
    (2 * focusAxis[1]) / window.innerHeight - 1,
  ];
  const x = aspect - center[0];
  const y = 1 - center[1];
  const scale = Math.sqrt(x * x + y * y); // 取半径
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  gl.viewport(0, 0, canvas.width, canvas.height);
  shader.setUniform('aspect', 'FLOAT', aspect);
  shader.setUniform('center', 'VEC2', center);
  shader.setUniform('scale', 'FLOAT', scale);
  shader.setUniform('inside', 'FLOAT', Number(theme === 'light'));
  const imageData = new ImageData(new Uint8ClampedArray(buffer), width, height);
  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_S,
    WebGL2RenderingContext.CLAMP_TO_EDGE
  );
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_T,
    WebGL2RenderingContext.CLAMP_TO_EDGE
  );
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    WebGL2RenderingContext.LINEAR
  );
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MAG_FILTER,
    WebGL2RenderingContext.LINEAR
  );
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    imageData
  );
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  const bezier = Bezier(0.65, 0, 0.35, 1);
  let startTime = -1;
  const draw = (time: number) => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    const $ = clamp((time - startTime) / animationTime, 0, 1);
    shader.setUniform('pct', 'FLOAT', bezier($));
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  return new Promise<void>((resolve) => {
    const callback = (time: number) => {
      if (startTime < 0) {
        startTime = time;
      }
      if (startTime + animationTime > time) {
        requestAnimationFrame(callback);
        draw(time);
      } else {
        document.body.removeChild(canvas);
        resolve();
      }
    };
    requestAnimationFrame(callback);
  });
};

const BackButtonStyle = styled(MyButton)`
  margin-bottom: 50px;
`;

const SideBar = () => {
  const { appStore } = useStore();

  const [themeSwitching, setThemeSwitching] = useState(false);
  const BottomButton = () => (
    <div className="BottomButton">
      <MyButton
        onClick={async (el) => {
          if (themeSwitching) {
            return;
          }
          setThemeSwitching(true);
          let switchSuccessful = false;
          const nextTheme = appStore.theme === 'light' ? 'dark' : 'light';
          try {
            const target = el.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            const bufferData: {
              buffer: Uint8Array;
              width: number;
              height: number;
            } = await window.electron.ipcRenderer.invoke('capture-window');
            appStore.setTheme(nextTheme);
            switchSuccessful = true;
            await themeTransition(bufferData, rect, nextTheme);
          } catch (error) {
            window.console.error(error);
            if (!switchSuccessful) {
              appStore.setTheme(nextTheme);
            }
          } finally {
            setThemeSwitching(false);
          }
        }}
        type="text"
        icon={<BulbOutlined />}
        size="large"
      />
      <MyButton type="text" icon={<SettingOutlined />} size="large" />
    </div>
  );

  const BackButton = () => (
    <BackButtonStyle
      type="text"
      icon={<LeftOutlined />}
      size="large"
      disabled
    />
  );

  const NavButton = () => (
    <div className="NavButton">
      <MyButton type="text" icon={<HomeOutlined />} size="large">
        首页
      </MyButton>
      <MyButton type="text" icon={<UserOutlined />} size="large">
        我的
      </MyButton>
    </div>
  );

  return (
    <Style
      style={{
        backgroundColor: appStore.theme === 'light' ? '#f1f2f3' : '#333',
      }}
    >
      <div className="sidebar_pages">
        <BackButton />
        <NavButton />
      </div>
      <div className="sidebar_settings">
        <BottomButton />
      </div>
    </Style>
  );
};

export default observer(SideBar);
