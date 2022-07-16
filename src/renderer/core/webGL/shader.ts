const loadShader = (
  gl: WebGL2RenderingContext,
  type: number,
  source: string
) => {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error('can not create shader');
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const errMsg = `An error occurred compiling the shaders: ${gl.getShaderInfoLog(
      shader
    )}`;
    gl.deleteShader(shader);
    throw new Error(errMsg);
  }
  return shader;
};

export type UType =
  | 'BOOLEAN'
  | 'INT'
  | 'FLOAT'
  | 'VEC2'
  | 'VEC3'
  | 'VEC4'
  | 'MAT2'
  | 'MAT3'
  | 'MAT4';

interface ShaderOptions {
  gl: WebGL2RenderingContext;
  vs: string;
  fs: string;
  transformFeedbackVaryings?: string[];
}

export default class Shader {
  gl: WebGL2RenderingContext;

  program: WebGLProgram;

  locations: Record<string, WebGLUniformLocation | null>;

  uniformBuffers: Record<string, WebGLBuffer | null>;

  constructor({ gl, vs, fs, transformFeedbackVaryings }: ShaderOptions) {
    this.gl = gl;
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vs);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fs);
    const shaderProgram = gl.createProgram();
    if (!shaderProgram) {
      throw new Error('can not create shader program');
    }

    this.program = shaderProgram;

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    if (transformFeedbackVaryings) {
      gl.transformFeedbackVaryings(
        shaderProgram,
        transformFeedbackVaryings,
        gl.INTERLEAVED_ATTRIBS
      );
    }
    gl.linkProgram(shaderProgram);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      throw new Error(
        `Unable to initialize the shader program: ${gl.getProgramInfoLog(
          shaderProgram
        )}`
      );
    }
    this.locations = {};
    this.uniformBuffers = {};
  }

  use() {
    this.gl.useProgram(this.program);
  }

  setUniform(name: string, type: 'BOOLEAN', value: boolean): void;
  setUniform(name: string, type: 'INT', value: number): void;
  setUniform(name: string, type: 'FLOAT', value: number): void;
  setUniform(name: string, type: 'VEC2', value: Float32List): void;
  setUniform(name: string, type: 'VEC3', value: Float32List): void;
  setUniform(name: string, type: 'VEC4', value: Float32List): void;
  setUniform(name: string, type: 'MAT2', value: Float32List): void;
  setUniform(name: string, type: 'MAT3', value: Float32List): void;
  setUniform(name: string, type: 'MAT4', value: Float32List): void;
  setUniform(name: string, type: UType, value: never): void;
  setUniform(name: string, type: UType, value: never) {
    let location = this.locations[name];
    if (!location) {
      location = this.gl.getUniformLocation(this.program, name);
      this.locations[name] = location;
    }
    switch (type) {
      case 'BOOLEAN':
        this.gl.uniform1i(location, Number(value));
        break;
      case 'INT':
        this.gl.uniform1i(location, Math.round(value));
        break;
      case 'FLOAT':
        this.gl.uniform1f(location, value);
        break;
      case 'VEC2':
        this.gl.uniform2fv(location, value);
        break;
      case 'VEC3':
        this.gl.uniform3fv(location, value);
        break;
      case 'VEC4':
        this.gl.uniform4fv(location, value);
        break;
      case 'MAT2':
        this.gl.uniformMatrix2fv(location, false, value);
        break;
      case 'MAT3':
        this.gl.uniformMatrix3fv(location, false, value);
        break;
      case 'MAT4':
        this.gl.uniformMatrix4fv(location, false, value);
        break;
      default:
    }
  }

  setUniformBuffer(name: string, data: Float32Array) {
    const { gl } = this;
    let buffer = this.uniformBuffers[name];
    if (!buffer) {
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.UNIFORM_BUFFER, buffer);
      gl.uniformBlockBinding(this.program, 0, 0);
      gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, buffer);
      this.uniformBuffers[name] = buffer;
    }

    gl.bindBuffer(gl.UNIFORM_BUFFER, buffer);
    gl.bufferData(gl.UNIFORM_BUFFER, data, gl.DYNAMIC_DRAW);
  }

  destroy() {
    this.gl.deleteProgram(this.program);
  }
}
