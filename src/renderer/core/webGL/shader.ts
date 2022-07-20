const loadShader = (
  context: WebGL2RenderingContext,
  type: number,
  source: string
) => {
  const shader = context.createShader(type);
  if (!shader) {
    throw new Error('can not create shader');
  }
  context.shaderSource(shader, source);
  context.compileShader(shader);
  if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    const errMsg = `An error occurred compiling the shaders: ${context.getShaderInfoLog(
      shader
    )}`;
    context.deleteShader(shader);
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
  context: WebGL2RenderingContext;
  vs: string;
  fs: string;
  transformFeedbackVaryings?: string[];
}

export default class Shader {
  context: WebGL2RenderingContext;

  program: WebGLProgram;

  locations: Record<string, WebGLUniformLocation | null>;

  uniformBuffers: Record<string, WebGLBuffer | null>;

  constructor({ context, vs, fs, transformFeedbackVaryings }: ShaderOptions) {
    this.context = context;
    const vertexShader = loadShader(context, context.VERTEX_SHADER, vs);
    const fragmentShader = loadShader(context, context.FRAGMENT_SHADER, fs);
    const shaderProgram = context.createProgram();
    if (!shaderProgram) {
      throw new Error('can not create shader program');
    }

    this.program = shaderProgram;

    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);

    if (transformFeedbackVaryings) {
      context.transformFeedbackVaryings(
        shaderProgram,
        transformFeedbackVaryings,
        context.INTERLEAVED_ATTRIBS
      );
    }
    context.linkProgram(shaderProgram);
    context.deleteShader(vertexShader);
    context.deleteShader(fragmentShader);
    if (!context.getProgramParameter(shaderProgram, context.LINK_STATUS)) {
      throw new Error(
        `Unable to initialize the shader program: ${context.getProgramInfoLog(
          shaderProgram
        )}`
      );
    }
    this.locations = {};
    this.uniformBuffers = {};
  }

  use() {
    this.context.useProgram(this.program);
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
      location = this.context.getUniformLocation(this.program, name);
      this.locations[name] = location;
    }
    switch (type) {
      case 'BOOLEAN':
        this.context.uniform1i(location, Number(value));
        break;
      case 'INT':
        this.context.uniform1i(location, Math.round(value));
        break;
      case 'FLOAT':
        this.context.uniform1f(location, value);
        break;
      case 'VEC2':
        this.context.uniform2fv(location, value);
        break;
      case 'VEC3':
        this.context.uniform3fv(location, value);
        break;
      case 'VEC4':
        this.context.uniform4fv(location, value);
        break;
      case 'MAT2':
        this.context.uniformMatrix2fv(location, false, value);
        break;
      case 'MAT3':
        this.context.uniformMatrix3fv(location, false, value);
        break;
      case 'MAT4':
        this.context.uniformMatrix4fv(location, false, value);
        break;
      default:
    }
  }

  setUniformBuffer(name: string, data: Float32Array) {
    const { context } = this;
    let buffer = this.uniformBuffers[name];
    if (!buffer) {
      buffer = context.createBuffer();
      context.bindBuffer(context.UNIFORM_BUFFER, buffer);
      context.uniformBlockBinding(this.program, 0, 0);
      context.bindBufferBase(context.UNIFORM_BUFFER, 0, buffer);
      this.uniformBuffers[name] = buffer;
    }

    context.bindBuffer(context.UNIFORM_BUFFER, buffer);
    context.bufferData(context.UNIFORM_BUFFER, data, context.DYNAMIC_DRAW);
  }

  destroy() {
    this.context.deleteProgram(this.program);
  }
}
