import { Direction } from '@minecraft/server';

const DIRECTION_VECTORS: Record<Direction, [number, number, number]> = {
  [Direction.Up]: [0, 1, 0],
  [Direction.Down]: [0, -1, 0],
  [Direction.North]: [0, 0, -1],
  [Direction.South]: [0, 0, 1],
  [Direction.East]: [1, 0, 0],
  [Direction.West]: [-1, 0, 0],
};

type VectorInput = 
  | [number, number, number?] 
  | { x: number; y: number; z?: number } 
  | Direction 
  | Vector;

export class Vector {
  private vals: [number, number, number];

  constructor(x: number, y: number, z = 0) {
    this.vals = [x, y, z];
  }

  // Static getters for common vectors
  static get ZERO(): Vector { return new Vector(0, 0, 0); }
  static get ONE(): Vector { return new Vector(1, 1, 1); }
  static get UP(): Vector { return new Vector(0, 1, 0); }
  static get DOWN(): Vector { return new Vector(0, -1, 0); }
  static get INF(): Vector { return new Vector(Infinity, Infinity, Infinity); }
  static get NEG_INF(): Vector { return new Vector(-Infinity, -Infinity, -Infinity); }

  /** Create a Vector from various input types */
  static from(input: VectorInput): Vector {
    if (input instanceof Vector) {
      return input.clone();
    } else if (Array.isArray(input)) {
      const [x, y, z] = input;
      return new Vector(x, y, z ?? 0);
    } else if (typeof input === "string") {
      // input is Direction enum key (string), convert to vector
      const dirVector = DIRECTION_VECTORS[input as Direction];
      if (!dirVector) throw new Error(`Invalid Direction: ${input}`);
      return new Vector(...dirVector);
    } else {
      // assume object with x,y,z
      return new Vector(input.x, input.y, input.z ?? 0);
    }
  }

  /** Create a vector from angles (in radians), angleX = pitch, angleY = yaw */
  static fromAngles(angleX: number, angleY: number): Vector {
    return new Vector(
      Math.sin(-angleY) * Math.cos(angleX),
      Math.sin(-angleX),
      Math.cos(angleY) * Math.cos(angleX),
    );
  }

  // --- Static arithmetic helpers ---

  static add(a: VectorInput, b: VectorInput): Vector {
    return Vector.from(a).add(b);
  }

  static sub(a: VectorInput, b: VectorInput): Vector {
    return Vector.from(a).sub(b);
  }

  static mul(a: VectorInput, b: VectorInput | number): Vector {
    return Vector.from(a).mul(b);
  }

  static div(a: VectorInput, b: VectorInput | number): Vector {
    return Vector.from(a).div(b);
  }

  static equals(a: VectorInput, b: VectorInput): boolean {
    return Vector.from(a).equals(b);
  }

  static min(a: VectorInput, b: VectorInput): Vector {
    return Vector.from(a).min(b);
  }

  static max(a: VectorInput, b: VectorInput): Vector {
    return Vector.from(a).max(b);
  }

  // --- Getters and setters ---

  get x(): number {
    return this.vals[0];
  }
  set x(value: number) {
    this.vals[0] = value;
  }

  get y(): number {
    return this.vals[1];
  }
  set y(value: number) {
    this.vals[1] = value;
  }

  get z(): number {
    return this.vals[2];
  }
  set z(value: number) {
    this.vals[2] = value;
  }

  get xy(): Vector {
    return new Vector(this.x, this.y);
  }

  get yz(): Vector {
    return new Vector(this.y, this.z);
  }

  get xz(): Vector {
    return new Vector(this.x, this.z);
  }

  get lengthSqr(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  get length(): number {
    return Math.hypot(this.x, this.y, this.z);
  }

  set length(newLength: number) {
    const currentLength = this.length;
    if (currentLength < 1e-6) throw new Error("Cannot set length of zero vector");
    this.x = (this.x / currentLength) * newLength;
    this.y = (this.y / currentLength) * newLength;
    this.z = (this.z / currentLength) * newLength;
  }

  clone(): Vector {
    return new Vector(this.x, this.y, this.z);
  }

  equals(other: VectorInput): boolean {
    const vec = Vector.from(other);
    return this.x === vec.x && this.y === vec.y && this.z === vec.z;
  }

  // --- Arithmetic operations ---

  add(value: VectorInput | number): this {
    if (typeof value === "number") {
      this.x += value;
      this.y += value;
      this.z += value;
    } else {
      const vec = Vector.from(value);
      this.x += vec.x;
      this.y += vec.y;
      this.z += vec.z;
    }
    return this;
  }

  sub(value: VectorInput | number): this {
    if (typeof value === "number") {
      this.x -= value;
      this.y -= value;
      this.z -= value;
    } else {
      const vec = Vector.from(value);
      this.x -= vec.x;
      this.y -= vec.y;
      this.z -= vec.z;
    }
    return this;
  }

  mul(value: VectorInput | number): this {
    if (typeof value === "number") {
      this.x *= value;
      this.y *= value;
      this.z *= value;
    } else {
      const vec = Vector.from(value);
      this.x *= vec.x;
      this.y *= vec.y;
      this.z *= vec.z;
    }
    return this;
  }

  /** 
  * Subtracts another vector from this one (non-destructive version)
  * Returns a new Vector instead of modifying the current one
  */
  subtract(value: VectorInput): Vector {
      const vec = Vector.from(value);
      return new Vector(
          this.x - vec.x,
          this.y - vec.y,
          this.z - vec.z
      );
  }

  /** 
  * Scales the vector by a scalar value (non-destructive version)
  * Returns a new Vector instead of modifying the current one
  */
  scale(factor: number): Vector {
      return new Vector(
          this.x * factor,
          this.y * factor,
          this.z * factor
      );
  }

  div(value: VectorInput | number): this {
    if (typeof value === "number") {
      this.x /= value;
      this.y /= value;
      this.z /= value;
    } else {
      const vec = Vector.from(value);
      this.x /= vec.x;
      this.y /= vec.y;
      this.z /= vec.z;
    }
    return this;
  }

  /** Rotate vector around given axis ('x', 'y', 'z'). Angle in radians. Default axis 'z' */
  rotate(angle: number, axis: 'x' | 'y' | 'z' = 'z'): this {
    if (angle === 0) return this;

    let cos = Math.cos(angle);
    let sin = Math.sin(angle);

    let x = this.x;
    let y = this.y;
    let z = this.z;

    switch (axis) {
      case 'x':
        this.y = y * cos - z * sin;
        this.z = y * sin + z * cos;
        break;
      case 'y':
        this.x = x * cos + z * sin;
        this.z = -x * sin + z * cos;
        break;
      case 'z':
        this.x = x * cos - y * sin;
        this.y = x * sin + y * cos;
        break;
    }
    return this;
  }

  min(value: VectorInput): this {
    const vec = Vector.from(value);
    this.x = Math.min(this.x, vec.x);
    this.y = Math.min(this.y, vec.y);
    this.z = Math.min(this.z, vec.z);
    return this;
  }

  max(value: VectorInput): this {
    const vec = Vector.from(value);
    this.x = Math.max(this.x, vec.x);
    this.y = Math.max(this.y, vec.y);
    this.z = Math.max(this.z, vec.z);
    return this;
  }

  floor(): this {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  }

  ceil(): this {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    return this;
  }

  round(): this {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    return this;
  }

  lerp(target: VectorInput, t: number): this {
    const vec = Vector.from(target);
    this.x = (1 - t) * this.x + t * vec.x;
    this.y = (1 - t) * this.y + t * vec.y;
    this.z = (1 - t) * this.z + t * vec.z;
    return this;
  }

  abs(): this {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    this.z = Math.abs(this.z);
    return this;
  }

  norm(): this {
    this.length = 1;
    return this;
  }

  /** Distance to another vector */
  distanceTo(other: VectorInput): number {
    return Vector.from(other).sub(this).length;
  }

  /** Returns 'x', 'y' or 'z' for the largest absolute axis */
  largestAxis(): 'x' | 'y' | 'z' {
    const absX = Math.abs(this.x);
    const absY = Math.abs(this.y);
    const absZ = Math.abs(this.z);
    if (absX > absY && absX > absZ) return 'x';
    if (absY > absZ) return 'y';
    return 'z';
  }

  /** Access the underlying array if needed */
  toArray(): [number, number, number] {
    return [...this.vals];
  }
}