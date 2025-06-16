import { Direction, RGB, Vector2, Vector3, VectorXZ } from "@minecraft/server";

/**
 * Includes various 3D vector functions and values.
 */
export namespace Vec3 {
    /**
     * The zero vector.
     * 
     * Value: **[`0`, `0`, `0`]**
     */
    export const Zero: Vector3 = { x: 0, y: 0, z: 0 };
    /**
     * The one vector.
     * 
     * Value: **[`1`, `1`, `1`]**
     */
    export const One: Vector3 = { x: 1, y: 1, z: 1 };

    /**
     * The unit vector in the up direction.
     * 
     * Value: **[`0`, `1`, `0`]**
     */
    export const Up: Vector3 = { x: 0, y: 1, z: 0 };
    /**
     * The unit vector in the down direction.
     * 
     * Value: **[`0`, `-1`, `0`]**
     */
    export const Down: Vector3 = { x: 0, y: -1, z: 0 };
    /**
     * The unit vector in the north direction.
     * 
     * Value: **[`0`, `0`, `-1`]**
     */
    export const North: Vector3 = { x: 0, y: 0, z: -1 };
    /**
     * The unit vector in the south direction.
     * 
     * Value: **[`0`, `0`, `1`]**
     */
    export const South: Vector3 = { x: 0, y: 0, z: 1 };
    /**
     * The unit vector in the east direction.
     * 
     * Value: **[`1`, `0`, `0`]**
     */
    export const East: Vector3 = { x: 1, y: 0, z: 0 };
    /**
     * The unit vector in the west direction.
     * 
     * Value: **[`-1`, `0`, `0`]**
     */
    export const West: Vector3 = { x: -1, y: 0, z: 0 };
    /**
     * The standard x basis vector.
     * 
     * Value: **[`1`, `0`, `0`]**
     */
    export const X: Vector3 = East;
    /**
     * The standard y basis vector.
     * 
     * Value: **[`0`, `1`, `0`]**
     */
    export const Y: Vector3 = Up;
    /**
     * The standard z basis vector.
     * 
     * Value: **[`0`, `0`, `1`]**
     */
    export const Z: Vector3 = South;

    /**
     * Tests if a value is of {@link Vector3} type.
     * @param v The specified value.
     * @returns Returns **True** if the value contains the `Vector3` properties, 
     * otherwise **False**.
     */
    export function isVector3(v: any): v is Vector3 {
        return typeof v === "object" && 'x' in v && 'y' in v && 'z' in v;
    }

    /**
     * Constructs a {@link Vector3} from the given value.
     * @param x The value to set each vector component to.
     */
    export function from(x: number): Vector3;
    /**
     * Constructs a {@link Vector3} from the given array.
     * @param x An array of 3 numbers corresponding to vector components.
     */
    export function from(x: number[]): Vector3;
    /**
     * Constructs a {@link Vector3} from the given values.
     * @param x The x component of the vector.
     * @param y The y component of the vector.
     * @param z The z component of the vector.
     */
    export function from(x: number, y: number, z: number): Vector3;
    export function from(x: unknown, y?: number, z?: number): Vector3 {
        if (typeof x === "number") return {
            x: x,
            y: y ?? x,
            z: z ?? x
        };
        if (Array.isArray(x) && x.length >= 3) return {
            x: x[0],
            y: x[1],
            z: x[2]
        }
        throw new Error("Invalid input values for vector construction.");
    }

    /**
     * Constructs a {@link Vector3} from a {@link VectorXZ} value.
     * @param v The specified vectorXZ value.
     * @returns A {@link Vector3} with the y component set to `0`.
     */
    export function fromVectorXZ(v: VectorXZ): Vector3 {
        return {
            x: v.x,
            y: 0.0,
            z: v.z
        };
    }

    /**
     * Converts a {@link Vector3} into a {@link VectorXZ}.
     * @param v The specified vector.
     * @returns A {@link VectorXZ}, omitting the y component of `v`.
     */
    export function toVectorXZ(v: Vector3): VectorXZ {
        return {
            x: v.x,
            z: v.z
        };
    }

    /**
     * Returns the corresponding unit vector to a 
     * value of the `minecraft:block_face` or the
     * `minecraft:cardinal_direction` block traits.
     * @param face The value of the block trait.
     * @throws Throws an error when `face` is not of the proper type.
     */
    export function fromBlockFace(face: string): Vector3 {
        switch (face) {
            case "up": return Up;
            case "down": return Down;
            case "north": return North;
            case "south": return South;
            case "east": return East;
            case "west": return West;
        }
        throw new Error("Argument was not of type 'block_face' or 'cardinal_direction'.");
    }

    /**
     * Converts a vector to a direction string from the
     * `minecraft:block_face` or `minecraft:cardinal_direction`
     * block traits.
     * @param v The specified vector.
     */
    export function toBlockFace(v: Vector3): string {
        return toDirection(v).toLowerCase();
    }

    /**
     * Returns the corresponding {@link Vector3} to the given direction.
     * @param d The specified direction value.
     */
    export function fromDirection(d: Direction): Vector3 {
        switch (d) {
            case Direction.Up: return Up;
            case Direction.Down: return Down;
            case Direction.North: return North;
            case Direction.South: return South;
            case Direction.East: return East;
            case Direction.West: return West;
        }
    }

    /**
     * Converts a vector to a {@link Direction}.
     * @param v The specified vector.
     * @returns The nearest {@link Direction} to the vector.
     */
    export function toDirection(v: Vector3): Direction {
        const a = abs(v), max = Math.max(a.x, a.y, a.z);
        if (max === a.x)
            return v.x >= 0 ? Direction.East : Direction.West;
        else if (max === a.y)
            return v.y >= 0 ? Direction.Up : Direction.Down;
        else return v.z >= 0 ? Direction.South : Direction.North;
    }

    /**
     * Constructs a {@link Vector3} from the corresponding components in an {@link RGB} value.
     * @param c The specified RGB value.
     * @returns An {@link RGB} value with corresponding components to those in `v`.
     */
    export function fromRGB(c: RGB): Vector3 {
        return {
            x: c.red,
            y: c.green,
            z: c.blue
        };
    }

    /**
     * Converts a {@link Vector3} into an {@link RGB} value.
     * @param v The specified vector.
     * @returns An {@link RGB} value with corresponding components to those in `v`.
     */
    export function toRGB(v: Vector3): RGB {
        return {
            red: v.x,
            green: v.y,
            blue: v.z
        };
    }

    /**
     * Converts a unit vector to a rotation vector.
     * @param v The specified unit vector.
     */
    export function toRotation(v: Vector3): Vector2 {
        return {
            x: -degrees(Math.asin(v.y)),
            y: -degrees(Math.atan2(v.x, v.z)),
        };
    }
    function degrees(radians: number): number {
        return 180 * radians / Math.PI;
    }

    /**
     * Converts a vector into an array of three numbers.
     * @param v The specified vector.
     * @returns An array containing the three components of `v`.
     */
    export function toArray(v: Vector3): number[] {
        const { x, y, z } = v;
        return [x, y, z];
    }

    /**
     * Stringifies a vector to the form "x y z".
     * @param v The specified vector.
     */
    export function toString(v: Vector3): string {
        return toArray(v).join(' ');
    }

    /**
     * Parses a vector from its stringified form.
     * @param s The vector in stringified form.
     * @returns A {@link Vector3} parsed from the string.
     */
    export function parse(s: string): Vector3 {
        const [x, y, z] = s.split(" ").map(Number);
        return { x, y, z };
    }

    /**
     * Determines if the specified vector is `NaN`.
     * @param v The specified vector.
     * @returns Returns **True** if the `v` parameter is `NaN`. Otherwise, **False**.
     */
    export function isNaN(v: Vector3): boolean {
        return Number.isNaN(v.x) || Number.isNaN(v.y) || Number.isNaN(v.z);
    }

    /**
     * Determines if the specified vector is infinite.
     * @param v The specified vector.
     * @returns Returns **True** if the `v` parameter is `+Infinity` or `-Infinity`. Otherwise, **False**.
     */
    export function isInf(v: Vector3): boolean {
        return !isFinite(v);
    }

    /**
     * Determines if the specified vector is finite.
     * @param v The specified vector.
     * @returns Returns **True** if the `v` parameter is finite; otherwise **False**.
     */
    export function isFinite(v: Vector3): boolean {
        return Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z);
    }

    /**
     * Determines if any of the components of `v` are non-zero.
     * @param v The specified vector.
     * @returns Returns `true` if at least one of the components of `v` is non-zero, otherwise `false`.
     */
    export function any(v: Vector3): boolean {
        return v.x !== 0 || v.y !== 0 || v.z !== 0;
    }

    /**
     * Determines if all of the components of `v` are non-zero.
     * @param v The specified vector.
     * @returns Returns `true` if all the components of `v` are non-zero, otherwise `false`.
     */
    export function all(v: Vector3): boolean {
        return v.x !== 0 && v.y !== 0 && v.z !== 0;
    }

    /**
     * Determines if any of the components of `u` are greater than the corresponding
     * components in `v`. 
     * @param u The first vector.
     * @param v The second vector.
     * @returns A vector containing the component-wise results of the greater than comparison.
     * 
     * `1` is returned if the expression resulted true, and `0` if it resulted false.
     */
    export function greaterThan(u: Vector3, v: Vector3): Vector3 {
        return {
            x: u.x > v.x ? 1 : 0,
            y: u.y > v.y ? 1 : 0,
            z: u.z > v.z ? 1 : 0
        };
    }

    /**
     * Determines if any of the components of `u` are less than the corresponding
     * components in `v`. 
     * @param u The first vector.
     * @param v The second vector.
     * @returns A vector containing the component-wise results of the less than comparison.
     * 
     * `1` is returned if the expression resulted true, and `0` if it resulted false.
     */
    export function lessThan(u: Vector3, v: Vector3): Vector3 {
        return {
            x: u.x < v.x ? 1 : 0,
            y: u.y < v.y ? 1 : 0,
            z: u.z < v.z ? 1 : 0
        };
    }

    /**
     * Determines if any of the components of `u` are greater than or equal to the corresponding
     * components in `v`. 
     * @param u The first vector.
     * @param v The second vector.
     * @returns A vector containing the component-wise results of the greater than or equal to comparison.
     * 
     * `1` is returned if the expression resulted true, and `0` if it resulted false.
     */
    export function greaterEqual(u: Vector3, v: Vector3): Vector3 {
        return {
            x: u.x >= v.x ? 1 : 0,
            y: u.y >= v.y ? 1 : 0,
            z: u.z >= v.z ? 1 : 0
        };
    }

    /**
     * Determines if any of the components of `u` are less than or equal to the corresponding
     * components in `v`. 
     * @param u The first vector.
     * @param v The second vector.
     * @returns A vector containing the component-wise results of the less than or equal to comparison.
     * 
     * `1` is returned if the expression resulted true, and `0` if it resulted false.
     */
    export function lessEqual(u: Vector3, v: Vector3): Vector3 {
        return {
            x: u.x <= v.x ? 1 : 0,
            y: u.y <= v.y ? 1 : 0,
            z: u.z <= v.z ? 1 : 0
        };
    }

    /**
     * Determines if two vectors are equal.
     * @param u The first specified vector.
     * @param v The second specified vector.
     * @returns `true` if every component of `u` is equal to those in `v`, otherwise `false`.
     */
    export function equal(u: Vector3, v: Vector3): boolean {
        return u.x === v.x && u.y === v.y && u.z === v.z;
    }

    /**
     * Selects the lesser of `u` and `v`.
     * @param u The `u` input value.
     * @param v The `v` input value.
     * @return The `u` or `v` parameter, whichever is the smallest value.
     */
    export function min(u: Vector3, v: Vector3): Vector3 {
        return {
            x: Math.min(u.x, v.x),
            y: Math.min(u.y, v.y),
            z: Math.min(u.z, v.z)
        };
    }

    /**
     * Selects the greater of `u` and `v`.
     * @param u The `u` input value.
     * @param v The `v` input value.
     * @return The `u` or `v` parameter, whichever is the largest value.
     */
    export function max(u: Vector3, v: Vector3): Vector3 {
        return {
            x: Math.max(u.x, v.x),
            y: Math.max(u.y, v.y),
            z: Math.max(u.z, v.z)
        };
    }

    /**
     * Clamps the specified vector to the specified minimum and maximum values.
     * @param v A value to clamp.
     * @param min The specified minimum value.
     * @param max The specified maximum value.
     * @returns The clamped value for the `v` parameter.
     */
    export function clamp(v: Vector3, min: Vector3, max: Vector3): Vector3 {
        return {
            x: Math.min(Math.max(v.x, min.x), max.x),
            y: Math.min(Math.max(v.y, min.y), max.y),
            z: Math.min(Math.max(v.z, min.z), max.z)
        };
    }

    /**
     * Clamps the specified vector within the range 0 to 1.
     * @param v The specified vector.
     */
    export function saturate(v: Vector3): Vector3 {
        return {
            x: Math.min(Math.max(v.x, 0), 1),
            y: Math.min(Math.max(v.y, 0), 1),
            z: Math.min(Math.max(v.z, 0), 1)
        };
    }

    /**
     * Returns the sign of `v`.
     * @param v The input value.
     * @returns `-1` if `v` is less than zero; `0` if `v` equals zero; and `1` if `v` is greater than zero.
     */
    export function sign(v: Vector3): Vector3 {
        return {
            x: Math.sign(v.x),
            y: Math.sign(v.y),
            z: Math.sign(v.z)
        };
    }

    /**
     * Returns the largest integer that is less than or equal to the specified vector.
     * @param v The specified vector.
     * @returns The largest integer value that is less than or equal to the `v` parameter.
     */
    export function floor(v: Vector3): Vector3 {
        return {
            x: Math.floor(v.x),
            y: Math.floor(v.y),
            z: Math.floor(v.z)
        };
    }

    /**
     * Returns the smallest integer value that is greater than or equal to the specified vector.
     * @param v The specified vector.
     * @returns The smallest integer value that is greater than or equal to the `v` parameter.
     */
    export function ceil(v: Vector3): Vector3 {
        return {
            x: Math.ceil(v.x),
            y: Math.ceil(v.y),
            z: Math.ceil(v.z)
        };
    }

    /**
     * Returns the fractional (or decimal) part of `v`; which is greater than or equal to 0 and less than 1.
     * @param v The specified vector.
     * @returns The fractional part of the `v` parameter.
     */
    export function frac(v: Vector3): Vector3 {
        return {
            x: v.x - Math.floor(v.x),
            y: v.y - Math.floor(v.y),
            z: v.z - Math.floor(v.z)
        };
    }

    /**
     * Rounds the specified vector to the nearest integer. Halfway cases are rounded to the nearest even.
     * @param v The specified vector.
     * @returns The `v` parameter, rounded to the nearest integer.
     */
    export function round(v: Vector3): Vector3 {
        return {
            x: Math.round(v.x),
            y: Math.round(v.y),
            z: Math.round(v.z)
        };
    }

    /**
     * Returns the remainder of `u`/`v`.
     * @param u The dividend.
     * @param v The divisor.
     * @returns The remainder of the `u` parameter divided by the `v` parameter.
     * @remarks The remainder is calculated such that *x* = *i* * *y* + *f*, where *i* is an integer, 
     * *f* has the same sign as *x*, and the absolute value of *f* is less than the absolute value of *y*.
     */
    export function mod(u: Vector3, v: Vector3): Vector3 {
        return {
            x: u.x % v.x,
            y: u.y % v.y,
            z: u.z % v.z
        };
    }

    /**
     * Negates a specified vector `v`.
     * @param v The specified vector.
     * @returns The negation of the `v` parameter.
     */
    export function neg(v: Vector3): Vector3 {
        return {
            x: -v.x,
            y: -v.y,
            z: -v.z
        };
    }

    /**
     * Returns the absolute value of the specified vector.
     * @param v The specified vector.
     * @returns The absolute value of the `v` parameter.
     */
    export function abs(v: Vector3): Vector3 {
        return {
            x: Math.abs(v.x),
            y: Math.abs(v.y),
            z: Math.abs(v.z)
        };
    }

    /**
     * Adds a set of vectors together.
     * @param v The initial vector.
     * @param args The vectors to add to `v`.
     * @returns The result of the addition of all argument vectors.
     */
    export function add(v: Vector3, ...args: Vector3[]): Vector3 {
        for (const arg of args) v = {
            x: v.x + arg.x,
            y: v.y + arg.y,
            z: v.z + arg.z
        };
        return v;
    }

    /**
     * Subtracts a set of vectors from one another.
     * @param v The initial vector.
     * @param args The vectors to subtract from `v`.
     * @returns The result of the subtraction of all argument vectors.
     */
    export function sub(v: Vector3, ...args: Vector3[]): Vector3 {
        for (const arg of args) v = {
            x: v.x - arg.x,
            y: v.y - arg.y,
            z: v.z - arg.z
        }
        return v;
    }

    /**
     * Multiplies a vector `v` by a scalar value `s`.
     * @param v The multiplicand vector.
     * @param s The scalar multiplier.
     * @returns The image of the vector `v` under scalar multiplication of `s`.
     */
    export function mul(v: Vector3, s: number): Vector3;
    /**
     * Multiplies a vector `u` by a vector `v`. 
     * @param v The multiplicand vector.
     * @param s The multiplier vector.
     * @returns The component-wise multiplication of `u` and `v`.
     */
    export function mul(u: Vector3, v: Vector3): Vector3;
    export function mul(v: Vector3, m: Vector3 | number): Vector3 {
        if (isVector3(m)) return {
            x: v.x * m.x,
            y: v.y * m.y,
            z: v.z * m.z
        };
        else return {
            x: v.x * m,
            y: v.y * m,
            z: v.z * m
        };
    }

    /**
     * Divides a vector `v` by a scalar value `s`.
     * @param v The dividend vector.
     * @param s The scalar divisor.
     */
    export function div(v: Vector3, s: number): Vector3;
    /**
     * Divides a vector `u` by a vector `v`. 
     * @param v The dividend vector.
     * @param s The divisor vector.
     * @returns The component-wise division of `u` and `v`.
     */
    export function div(u: Vector3, v: Vector3): Vector3;
    export function div(v: Vector3, m: Vector3 | number): Vector3 {
        if (isVector3(m)) return {
            x: v.x / m.x,
            y: v.y / m.y,
            z: v.z / m.z
        };
        else return {
            x: v.x / m,
            y: v.y / m,
            z: v.z / m
        };
    }

    /**
     * Returns the square root of the specified vector, per component.
     * @param v The specified vector.
     * @returns The square root of the `v` parameter, per component.
     */
    export function sqrt(v: Vector3): Vector3 {
        return {
            x: Math.sqrt(v.x),
            y: Math.sqrt(v.y),
            z: Math.sqrt(v.z)
        };
    }

    /**
     * Returns the base-e exponential of the specified vector.
     * @param v The specified vector.
     * @returns The base-e exponential of the `v` parameter.
     */
    export function exp(v: Vector3): Vector3 {
        return {
            x: Math.exp(v.x),
            y: Math.exp(v.y),
            z: Math.exp(v.z)
        };
    }

    /**
     * Returns the base 2 exponential of the specified vector.
     * @param v The specified vector.
     * @returns The base 2 exponential of the `v` parameter.
     */
    export function exp2(v: Vector3): Vector3 {
        return {
            x: Math.pow(2, v.x),
            y: Math.pow(2, v.y),
            z: Math.pow(2, v.z)
        };
    }

    /**
     * Returns the base-e logarithm of the specified vector.
     * @param v The specified vector.
     * @returns The base-e logarithm of the `v` parameter.
     */
    export function log(v: Vector3): Vector3 {
        return {
            x: Math.log(v.x),
            y: Math.log(v.y),
            z: Math.log(v.z)
        };
    }

    /**
     * Returns the base-2 logarithm of the specified vector.
     * @param v The specified vector.
     * @returns The base-2 logarithm of the `v` parameter.
     */
    export function log2(v: Vector3): Vector3 {
        return {
            x: Math.log2(v.x),
            y: Math.log2(v.y),
            z: Math.log2(v.z)
        };
    }

    /**
     * Returns the base-10 logarithm of the specified vector.
     * @param v The specified vector.
     * @returns The base-10 logarithm of the `v` parameter.
     */
    export function log10(v: Vector3): Vector3 {
        return {
            x: Math.log10(v.x),
            y: Math.log10(v.y),
            z: Math.log10(v.z)
        };
    }

    /**
     * Returns the specified vector raised to a scalar power.
     * @param v The specified vector.
     * @param p The specified scalar power.
     * @returns The component-wise exponentiation of `v` to the power of `p`.
     */
    export function pow(v: Vector3, p: number): Vector3;
    /**
     * Returns the specified vector raised to a specified power.
     * @param u The specified vector.
     * @param v The specified power.
     * @returns The component-wise exponentiation of `u` to the power of `v`.
     */
    export function pow(u: Vector3, v: Vector3): Vector3;
    export function pow(v: Vector3, p: Vector3 | number): Vector3 {
        if (isVector3(p)) return {
            x: Math.pow(v.x, p.x),
            y: Math.pow(v.y, p.y),
            z: Math.pow(v.z, p.z)
        };
        else return {
            x: Math.pow(v.x, p),
            y: Math.pow(v.y, p),
            z: Math.pow(v.z, p)
        };
    }

    /**
     * Returns the sine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The sine of the `v` parameter.
     */
    export function sin(v: Vector3): Vector3 {
        return {
            x: Math.sin(v.x),
            y: Math.sin(v.y),
            z: Math.sin(v.z)
        };
    }

    /**
     * Returns the arcsine of the specified vector.
     * @param v The specified vector.
     * @returns The arcsine of the `v` parameter.
     */
    export function asin(v: Vector3): Vector3 {
        return {
            x: Math.asin(v.x),
            y: Math.asin(v.y),
            z: Math.asin(v.z)
        };
    }

    /**
     * Returns the hyperbolic sine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The hyperbolic sine of the `v` parameter.
     */
    export function sinh(v: Vector3): Vector3 {
        return {
            x: Math.sinh(v.x),
            y: Math.sinh(v.y),
            z: Math.sinh(v.z)
        };
    }

    /**
     * Returns the hyperbolic arcsine of the specified vector.
     * @param v The specified vector.
     * @returns The hyperbolic arcsine of the `v` parameter.
     */
    export function asinh(v: Vector3): Vector3 {
        return {
            x: Math.asinh(v.x),
            y: Math.asinh(v.y),
            z: Math.asinh(v.z)
        };
    }

    /**
     * Returns the cosine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The cosine of the `v` parameter.
     */
    export function cos(v: Vector3): Vector3 {
        return {
            x: Math.cos(v.x),
            y: Math.cos(v.y),
            z: Math.cos(v.z)
        };
    }

    /**
     * Returns the arccosine of the specified vector.
     * @param v The specified vector. Each component should be a value within the range of -1 to 1.
     * @returns The arccosine of the `v` parameter.
     */
    export function acos(v: Vector3): Vector3 {
        return {
            x: Math.acos(v.x),
            y: Math.acos(v.y),
            z: Math.acos(v.z)
        };
    }

    /**
     * Returns the hyperbolic cosine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The hyperbolic cosine of the `v` parameter.
     */
    export function cosh(v: Vector3): Vector3 {
        return {
            x: Math.cosh(v.x),
            y: Math.cosh(v.y),
            z: Math.cosh(v.z)
        };
    }

    /**
     * Returns the hyperbolic arccosine of the specified vector.
     * @param v The specified vector. Each component should be a value within the range of -1 to 1.
     * @returns The hyperbolic arccosine of the `v` parameter.
     */
    export function acosh(v: Vector3): Vector3 {
        return {
            x: Math.acosh(v.x),
            y: Math.acosh(v.y),
            z: Math.acosh(v.z)
        };
    }

    /**
     * Returns the tangent of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The tangent of the `v` parameter.
     */
    export function tan(v: Vector3): Vector3 {
        return {
            x: Math.tan(v.x),
            y: Math.tan(v.y),
            z: Math.tan(v.z)
        };
    }

    /**
     * Returns the arctangent of the specified vector.
     * @param v The specified vector.
     * @returns The arctangent of the `v` parameter. This value is within the range of -π/2 to π/2.
     */
    export function atan(v: Vector3): Vector3 {
        return {
            x: Math.atan(v.x),
            y: Math.atan(v.y),
            z: Math.atan(v.z)
        };
    }

    /**
     * Returns the hyperbolic tangent of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The hyperbolic tangent of the `v` parameter.
     */
    export function tanh(v: Vector3): Vector3 {
        return {
            x: Math.tanh(v.x),
            y: Math.tanh(v.y),
            z: Math.tanh(v.z)
        };
    }

    /**
     * Returns the hyperbolic arctangent of the specified vector.
     * @param v The specified vector.
     * @returns The hyperbolic arctangent of the `v` parameter. 
     */
    export function atanh(v: Vector3): Vector3 {
        return {
            x: Math.atanh(v.x),
            y: Math.atanh(v.y),
            z: Math.atanh(v.z)
        };
    }

    /**
     * Returns the vector one unit above the given vector.
     * @param v The specified vector.
     */
    export function above(v: Vector3): Vector3;
    /**
     * Adds a scalar multiple of the `Up` vector to another.
     * @param v The specified vector.
     * @param s The specified scalar multiple.
     */
    export function above(v: Vector3, s: number): Vector3;
    export function above(v: Vector3, s: number = 1) {
        return add(v, mul(Up, s));
    }

    /**
     * Returns the vector one unit below the given vector.
     * @param v The specified vector.
     */
    export function below(v: Vector3): Vector3;
    /**
     * Adds a scalar multiple of the `Down` vector to another.
     * @param v The specified vector.
     * @param s The specified scalar multiple.
     */
    export function below(v: Vector3, s: number): Vector3;
    export function below(v: Vector3, s: number = 1) {
        return add(v, mul(Down, s));
    }

    /**
     * Returns the vector one unit north of the given vector.
     * @param v The specified vector.
     */
    export function north(v: Vector3): Vector3;
    /**
     * Adds a scalar multiple of the `North` vector to another.
     * @param v The specified vector.
     * @param s The specified scalar multiple.
     */
    export function north(v: Vector3, s: number): Vector3;
    export function north(v: Vector3, s: number = 1) {
        return add(v, mul(North, s));
    }

    /**
     * Returns the vector one unit south of the given vector.
     * @param v The specified vector.
     */
    export function south(v: Vector3): Vector3;
    /**
     * Adds a scalar multiple of the `South` vector to another.
     * @param v The specified vector.
     * @param s The specified scalar multiple.
     */
    export function south(v: Vector3, s: number): Vector3;
    export function south(v: Vector3, s: number = 1) {
        return add(v, mul(South, s));
    }

    /**
     * Returns the vector one unit east of the given vector.
     * @param v The specified vector.
     */
    export function east(v: Vector3): Vector3;
    /**
     * Adds a scalar multiple of the `East` vector to another.
     * @param v The specified vector.
     * @param s The specified scalar multiple.
     */
    export function east(v: Vector3, s: number): Vector3;
    export function east(v: Vector3, s: number = 1) {
        return add(v, mul(East, s));
    }

    /**
     * Returns the vector one unit west of the given vector.
     * @param v The specified vector.
     */
    export function west(v: Vector3): Vector3;
    /**
     * Adds a scalar multiple of the `West` vector to another.
     * @param v The specified vector.
     * @param s The specified scalar multiple.
     */
    export function west(v: Vector3, s: number): Vector3;
    export function west(v: Vector3, s: number = 1) {
        return add(v, mul(West, s));
    }

    /**
     * Returns the dot product of two vectors.
     * @param u The first vector.
     * @param v The second vector.
     * @returns The dot product of `u` and `v`.
     */
    export function dot(u: Vector3, v: Vector3): number {
        return u.x * v.x + u.y * v.y + u.z * v.z;
    }

    /**
     * Returns the cross product of two vectors.
     * @param u The first vector.
     * @param v The second vector.
     * @returns The cross product of `u` and `v`.
     */
    export function cross(u: Vector3, v: Vector3): Vector3 {
        return {
            x: u.y * v.z - u.z * v.y,
            y: u.z * v.x - u.x * v.z,
            z: u.x * v.y - u.y * v.x
        };
    }

    /**
     * Returns the length of the specified vector.
     * @param v The specified vector.
     * @returns A scalar that represents the length of `v`.
     */
    export function length(v: Vector3): number {
        return Math.hypot(v.x, v.y, v.z);
    }

    /**
     * Normalizes the specified vector according to `v` / length(`v`).
     * @param v The specified vector.
     * @returns The normalized vector `v`.
     */
    export function normalize(v: Vector3): Vector3 {
        return div(v, length(v));
    }

    /**
     * Returns a distance scalar between two vectors.
     * @param u The first vector to compare.
     * @param v The second vector to compare.
     * @returns A scalar value that represents the distance between `u` and `v`.
     */
    export function distance(u: Vector3, v: Vector3): number {
        return length(sub(u, v));
    }

    /**
     * Projects a vector `u` onto a vector `v`.
     * @param u The first value.
     * @param v The second value.
     * @returns The vector projection of `u` onto `v`.
     */
    export function project(u: Vector3, v: Vector3): Vector3 {
        return mul(v, dot(u, v) / dot(v, v));
    }

    /**
     * Gets the rejection of a vector `u` from a vector `v`.
     * @param u The first value.
     * @param v The second value.
     * @returns The vector rejection of `u` from `v`.
     * @remarks This function is equivalent to *u* - project(*u*, *v*).
     */
    export function reject(u: Vector3, v: Vector3): Vector3 {
        return sub(u, project(u, v));
    }

    /**
     * Returns a reflection vector using an incident ray and a surface normal.
     * @param i An incident vector.
     * @param n A normal vector.
     * @returns A reflection vector.
     * @remarks This function calculates the reflection vector using the following formula: *v* = *i* - 2 * *n* * dot(*i*, *n*).
     */
    export function reflect(i: Vector3, n: Vector3): Vector3 {
        return sub(i, mul(n, 2 * dot(n, i)));
    }

    /**
     * Returns a refraction vector using an incident ray, a surface normal, and a refraction index.
     * @param i An incident direction vector.
     * @param n A surface normal vector.
     * @param eta The ratio of refractive indices between the incident medium and the refracting medium.
     * @returns A refraction vector.
     */
    export function refract(i: Vector3, n: Vector3, eta: number): Vector3 {
        const cosi = -dot(i, n);
        const sin2t = eta * eta * (1 - cosi * cosi);
        const cost = Math.sqrt(1 - sin2t);
        return add(mul(i, eta), mul(n, eta * cosi - cost));
    }

    /**
     * Performs a linear interpolation between two vectors.
     * @param u The first vector.
     * @param v The second vector.
     * @param t The interpolant value between `u` and `v`.
     * @returns The result of the linear interpolation.
     * @remarks Linear interpolation is based on the following formula: *x*\*(1-*s*) + *y*\**s* which can 
     * equivalently be written as *x* + *s*\*(*y*-*x*).
     */
    export function lerp(u: Vector3, v: Vector3, t: number): Vector3 {
        if (t === 0) return u;
        if (t === 1) return v;
        return {
            x: u.x + t * (v.x - u.x),
            y: u.y + t * (v.y - u.y),
            z: u.z + t * (v.z - u.z)
        };
    }

    /**
     * Performs a spherical linear interpolation.
     * @param u The first unit vector.
     * @param v The second unit vector.
     * @param t A value that spherically interpolates between `u` and `v`.
     * @returns The result of the spherical linear interpolation.
     */
    export function slerp(u: Vector3, v: Vector3, t: number): Vector3 {
        if (t === 0) return u;
        if (t === 1) return v;
        const cost = dot(u, v);
        const theta = Math.acos(cost);
        const sint = Math.sqrt(1 - cost * cost);
        const tu = Math.sin((1 - t) * theta) / sint;
        const tv = Math.sin(t * theta) / sint;
        return add(mul(u, tu), mul(v, tv));
    }

    /**
     * Rotates a vector `v` accross an axis `k` by angle `t`.
     * @param v The vector to be rotated.
     * @param k The unit rotation axis vector.
     * @param t The angle in radians to rotate about the axis.
     * @returns The input parameter `v` rotated about `k` by the specified angle `t`.
     */
    export function rotate(v: Vector3, k: Vector3, t: number): Vector3 {
        const cost = Math.cos(t), sint = Math.sin(t);
        const par = mul(k, dot(v, k)), per = sub(v, par), kxv = cross(k, v);
        return add(par, add(mul(per, cost), mul(kxv, sint)));
    }
}
