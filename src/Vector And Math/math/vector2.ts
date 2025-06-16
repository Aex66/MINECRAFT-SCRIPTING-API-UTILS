import { Vector2, VectorXZ } from "@minecraft/server";
import { Mat2 } from "./matrix2";

/**
 * Includes various 2D vector functions and values.
 */
export namespace Vec2 {
    /**
     * The zero vector.
     * 
     * Value: **[`0`, `0`]**
     */
    export const Zero: Vector2 = { x: 0, y: 0 };
    /**
     * The one vector.
     * 
     * Value: **[`1`, `1`]**
     */
    export const One: Vector2 = { x: 1, y: 1 };

    /**
     * The unit vector in the up direction.
     * 
     * Value: **[`0`, `1`]**
     */
    export const Up: Vector2 = { x: 0, y: 1 };
    /**
     * The unit vector in the down direction.
     * 
     * Value: **[`0`, `-1`]**
     */
    export const Down: Vector2 = { x: 0, y: -1 };
    /**
     * The unit vector in the left direction.
     * 
     * Value: **[`-1`, `0`]**
     */
    export const Left: Vector2 = { x: -1, y: 0 };
    /**
     * The unit vector in the right direction.
     * 
     * Value: **[`1`, `0`]**
     */
    export const Right: Vector2 = { x: 1, y: 0 };
    /**
     * The standard x basis vector.
     * 
     * Value: **[`1`, `0`]**
     */
    export const X: Vector2 = Right;
    /**
     * The standard y basis vector.
     * 
     * Value: **[`0`, `1`]**
     */
    export const Y: Vector2 = Up;

    /**
     * Tests if a value is of {@link Vector2} type.
     * @param v The specified value.
     * @returns Returns **True** if the value contains the `Vector2` properties, 
     * otherwise **False**.
     */
    export function isVector2(v: any): v is Vector2 {
        return typeof v === "object" && 'x' in v && 'y' in v;
    }

    /**
     * Constructs a {@link Vector2} from the given value.
     * @param x The value to set each vector component to.
     */
    export function from(x: number): Vector2;
    /**
     * Constructs a {@link Vector2} from the given array.
     * @param x An array of 2 numbers corresponding to vector components.
     */
    export function from(x: number[]): Vector2;
    /**
     * Constructs a {@link Vector2} from the given values.
     * @param x The x component of the vector.
     * @param y The y component of the vector.
     */
    export function from(x: number, y: number): Vector2;
    export function from(x: unknown, y?: number): Vector2 {
        if (Array.isArray(x) && x.length >= 2) return {
            x: x[0],
            y: x[1]
        };
        else if (typeof x === "number") return {
            x: x,
            y: y ?? x
        };
        throw new Error("Invalid input values for vector construction.");
    }

    /**
     * Constructs a {@link Vector2} from a {@link VectorXZ} value.
     * @param v The specified vectorXZ value.
     * @returns A {@link Vector2} with the Y component set to `v`'s z component.
     */
    export function fromVectorXZ(v: VectorXZ): Vector2 {
        return {
            x: v.x,
            y: v.z
        };
    }

    /**
     * Converts a {@link Vector2} into a {@link VectorXZ}.
     * @param v The specified vector.
     * @returns A {@link VectorXZ} with the Z component set to `v`'s y component.
     */
    export function toVectorXZ(v: Vector2): VectorXZ {
        return {
            x: v.x,
            z: v.y
        };
    }

    /**
     * Converts a vector into an array of two numbers.
     * @param v The specified vector.
     * @returns An array containing the two components of `v`.
     */
    export function toArray(v: Vector2): number[] {
        const { x, y } = v;
        return [x, y];
    }

    /**
     * Stringifies a vector to the form "x y".
     * @param v The specified vector.
     */
    export function toString(v: Vector2): string {
        return toArray(v).join(' ');
    }

    /**
     * Parses a vector from its stringified form.
     * @param s The vector in stringified form.
     * @returns A {@link Vector2} parsed from the string.
     */
    export function parse(s: string): Vector2 {
        const [x, y] = s.split(' ').map(Number);
        return { x, y };
    }

    /**
     * Determines if the specified vector is `NaN`.
     * @param v The specified vector.
     * @returns Returns **True** if the `v` parameter is `NaN`. Otherwise, **False**.
     */
    export function isNaN(v: Vector2): boolean {
        return Number.isNaN(v.x) || Number.isNaN(v.y);
    }

    /**
     * Determines if the specified vector is infinite.
     * @param v The specified vector.
     * @returns Returns **True** if the `v` parameter is `+Infinity` or `-Infinity`. Otherwise, **False**.
     */
    export function isInf(v: Vector2): boolean {
        return !isFinite(v);
    }

    /**
     * Determines if the specified vector is finite.
     * @param v The specified vector.
     * @returns Returns **True** if the `v` parameter is finite; otherwise **False**.
     */
    export function isFinite(v: Vector2): boolean {
        return Number.isFinite(v.x) && Number.isFinite(v.y);
    }

    /**
     * Determines if any of the components of `v` are non-zero.
     * @param v The specified vector.
     * @returns Returns `true` if at least one of the components of `v` is non-zero, otherwise `false`.
     */
    export function any(v: Vector2): boolean {
        return v.x !== 0 || v.y !== 0;
    }

    /**
     * Determines if all of the components of `v` are non-zero.
     * @param v The specified vector.
     * @returns Returns `true` if all the components of `v` are non-zero, otherwise `false`.
     */
    export function all(v: Vector2): boolean {
        return v.x !== 0 && v.y !== 0;
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
    export function greaterThan(u: Vector2, v: Vector2): Vector2 {
        return {
            x: u.x > v.x ? 1 : 0,
            y: u.y > v.y ? 1 : 0
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
    export function lessThan(u: Vector2, v: Vector2): Vector2 {
        return {
            x: u.x < v.x ? 1 : 0,
            y: u.y < v.y ? 1 : 0
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
    export function greaterEqual(u: Vector2, v: Vector2): Vector2 {
        return {
            x: u.x >= v.x ? 1 : 0,
            y: u.y >= v.y ? 1 : 0
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
    export function lessEqual(u: Vector2, v: Vector2): Vector2 {
        return {
            x: u.x <= v.x ? 1 : 0,
            y: u.y <= v.y ? 1 : 0
        };
    }

    /**
     * Determines if two vectors are equal.
     * @param u The first specified vector.
     * @param v The second specified vector.
     * @returns `true` if every component of `u` is equal to those in `v`, otherwise `false`.
     */
    export function equal(u: Vector2, v: Vector2): boolean {
        return u.x === v.x && u.y === v.y;
    }

    /**
     * Selects the lesser of `u` and `v`.
     * @param u The `u` input value.
     * @param v The `v` input value.
     * @return The `u` or `v` parameter, whichever is the smallest value.
     */
    export function min(u: Vector2, v: Vector2): Vector2 {
        return {
            x: Math.min(u.x, v.x),
            y: Math.min(u.y, v.y)
        };
    }

    /**
     * Selects the greater of `u` and `v`.
     * @param u The `u` input value.
     * @param v The `v` input value.
     * @return The `u` or `v` parameter, whichever is the largest value.
     */
    export function max(u: Vector2, v: Vector2): Vector2 {
        return {
            x: Math.max(u.x, v.x),
            y: Math.max(u.y, v.y)
        };
    }

    /**
     * Clamps the specified vector to the specified minimum and maximum values.
     * @param v A value to clamp.
     * @param min The specified minimum value.
     * @param max The specified maximum value.
     * @returns The clamped value for the `v` parameter.
     */
    export function clamp(v: Vector2, min: Vector2, max: Vector2): Vector2 {
        return {
            x: Math.min(Math.max(v.x, min.x), max.x),
            y: Math.min(Math.max(v.y, min.y), max.y)
        };
    }

    /**
     * Clamps the specified vector within the range 0 to 1.
     * @param v The specified vector.
     */
    export function saturate(v: Vector2): Vector2 {
        return {
            x: Math.min(Math.max(v.x, 0), 1),
            y: Math.min(Math.max(v.y, 0), 1)
        };
    }

    /**
     * Returns the sign of `v`.
     * @param v The input value.
     * @returns `-1` if `v` is less than zero; `0` if `v` equals zero; and `1` if `v` is greater than zero.
     */
    export function sign(v: Vector2): Vector2 {
        return {
            x: Math.sign(v.x),
            y: Math.sign(v.y)
        };
    }

    /**
     * Returns the largest integer that is less than or equal to the specified vector.
     * @param v The specified vector.
     * @returns The largest integer value that is less than or equal to the `v` parameter.
     */
    export function floor(v: Vector2): Vector2 {
        return {
            x: Math.floor(v.x),
            y: Math.floor(v.y)
        };
    }

    /**
     * Returns the smallest integer value that is greater than or equal to the specified vector.
     * @param v The specified vector.
     * @returns The smallest integer value that is greater than or equal to the `v` parameter.
     */
    export function ceil(v: Vector2): Vector2 {
        return {
            x: Math.ceil(v.x),
            y: Math.ceil(v.y)
        };
    }

    /**
     * Returns the fractional (or decimal) part of `v`; which is greater than or equal to 0 and less than 1.
     * @param v The specified vector.
     * @returns The fractional part of the `v` parameter.
     */
    export function frac(v: Vector2): Vector2 {
        return {
            x: v.x - Math.floor(v.x),
            y: v.y - Math.floor(v.y)
        };
    }

    /**
     * Rounds the specified vector to the nearest integer. Halfway cases are rounded to the nearest even.
     * @param v The specified vector.
     * @returns The `v` parameter, rounded to the nearest integer.
     */
    export function round(v: Vector2): Vector2 {
        return {
            x: Math.round(v.x),
            y: Math.round(v.y)
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
    export function mod(u: Vector2, v: Vector2): Vector2 {
        return {
            x: u.x % v.x,
            y: u.y % v.y
        };
    }

    /**
     * Negates a specified vector `v`.
     * @param v The specified vector.
     * @returns The negation of the `v` parameter.
     */
    export function neg(v: Vector2): Vector2 {
        return {
            x: -v.x,
            y: -v.y
        };
    }

    /**
     * Returns the absolute value of the specified vector.
     * @param v The specified vector.
     * @returns The absolute value of the `v` parameter.
     */
    export function abs(v: Vector2): Vector2 {
        return {
            x: Math.abs(v.x),
            y: Math.abs(v.y)
        };
    }

    /**
     * Adds a set of vectors together.
     * @param v The initial vector.
     * @param args The vectors to add to `v`.
     * @returns The result of the addition of all argument vectors.
     */
    export function add(v: Vector2, ...args: Vector2[]): Vector2 {
        for (const arg of args) v = {
            x: v.x + arg.x,
            y: v.y + arg.y
        };
        return v;
    }
    
    /**
     * Subtracts a set of vectors from one another.
     * @param v The initial vector.
     * @param args The vectors to subtract from `v`.
     * @returns The result of the subtraction of all argument vectors.
     */
    export function sub(v: Vector2, ...args: Vector2[]): Vector2 {
        for (const arg of args) v = {
            x: v.x - arg.x,
            y: v.y - arg.y
        }
        return v;
    }

    /**
     * Multiplies a vector `v` by a scalar value `s`.
     * @param v The multiplicand vector.
     * @param s The scalar multiplier.
     * @returns The image of the vector `v` under scalar multiplication of `s`.
     */
    export function mul(v: Vector2, s: number): Vector2;
    /**
     * Multiplies a vector `u` by a vector `v`. 
     * @param v The multiplicand vector.
     * @param s The multiplier vector.
     * @returns The component-wise multiplication of `u` and `v`.
     */
    export function mul(u: Vector2, v: Vector2): Vector2;
    export function mul(v: Vector2, m: Vector2 | number): Vector2 {
        if (isVector2(m)) return {
            x: v.x * m.x,
            y: v.y * m.y
        };
        else return {
            x: v.x * m,
            y: v.y * m
        };
    }

    /**
     * Divides a vector `v` by a scalar value `s`.
     * @param v The dividend vector.
     * @param s The scalar divisor.
     */
    export function div(v: Vector2, s: number): Vector2;
    /**
     * Divides a vector `u` by a vector `v`. 
     * @param v The dividend vector.
     * @param s The divisor vector.
     * @returns The component-wise division of `u` and `v`.
     */
    export function div(u: Vector2, v: Vector2): Vector2;
    export function div(v: Vector2, m: Vector2 | number): Vector2 {
        if (isVector2(m)) return {
            x: v.x / m.x,
            y: v.y / m.y
        };
        else return {
            x: v.x / m,
            y: v.y / m
        };
    }

    /**
     * Returns the square root of the specified vector, per component.
     * @param v The specified vector.
     * @returns The square root of the `v` parameter, per component.
     */
    export function sqrt(v: Vector2): Vector2 {
        return {
            x: Math.sqrt(v.x),
            y: Math.sqrt(v.y)
        };
    }

    /**
     * Returns the base-e exponential of the specified vector.
     * @param v The specified vector.
     * @returns The base-e exponential of the `v` parameter.
     */
    export function exp(v: Vector2): Vector2 {
        return {
            x: Math.exp(v.x),
            y: Math.exp(v.y)
        };
    }

    /**
     * Returns the base 2 exponential of the specified vector.
     * @param v The specified vector.
     * @returns The base 2 exponential of the `v` parameter.
     */
    export function exp2(v: Vector2): Vector2 {
        return {
            x: Math.pow(2, v.x),
            y: Math.pow(2, v.y)
        };
    }

    /**
     * Returns the base-e logarithm of the specified vector.
     * @param v The specified vector.
     * @returns The base-e logarithm of the `v` parameter.
     */
    export function log(v: Vector2): Vector2 {
        return {
            x: Math.log(v.x),
            y: Math.log(v.y)
        };
    }

    /**
     * Returns the base-2 logarithm of the specified vector.
     * @param v The specified vector.
     * @returns The base-2 logarithm of the `v` parameter.
     */
    export function log2(v: Vector2): Vector2 {
        return {
            x: Math.log2(v.x),
            y: Math.log2(v.y)
        };
    }

    /**
     * Returns the base-10 logarithm of the specified vector.
     * @param v The specified vector.
     * @returns The base-10 logarithm of the `v` parameter.
     */
    export function log10(v: Vector2): Vector2 {
        return {
            x: Math.log10(v.x),
            y: Math.log10(v.y)
        };
    }

    /**
     * Returns the specified vector raised to a scalar power.
     * @param v The specified vector.
     * @param p The specified scalar power.
     * @returns The component-wise exponentiation of `v` to the power of `p`.
     */
    export function pow(v: Vector2, p: number): Vector2;
    /**
     * Returns the specified vector raised to a specified power.
     * @param u The specified vector.
     * @param v The specified power.
     * @returns The component-wise exponentiation of `u` to the power of `v`.
     */
    export function pow(u: Vector2, v: Vector2): Vector2;
    export function pow(v: Vector2, p: Vector2 | number): Vector2 {
        if (isVector2(p)) return {
            x: Math.pow(v.x, p.x),
            y: Math.pow(v.y, p.y)
        };
        else return {
            x: Math.pow(v.x, p),
            y: Math.pow(v.y, p)
        };
    }

    /**
     * Returns the sine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The sine of the `v` parameter.
     */
    export function sin(v: Vector2): Vector2 {
        return {
            x: Math.sin(v.x),
            y: Math.sin(v.y)
        };
    }

    /**
     * Returns the arcsine of the specified vector.
     * @param v The specified vector.
     * @returns The arcsine of the `v` parameter.
     */
    export function asin(v: Vector2): Vector2 {
        return {
            x: Math.asin(v.x),
            y: Math.asin(v.y)
        };
    }

    /**
     * Returns the hyperbolic sine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The hyperbolic sine of the `v` parameter.
     */
    export function sinh(v: Vector2): Vector2 {
        return {
            x: Math.sinh(v.x),
            y: Math.sinh(v.y)
        };
    }

    /**
     * Returns the hyperbolic arcsine of the specified vector.
     * @param v The specified vector.
     * @returns The hyperbolic arcsine of the `v` parameter.
     */
    export function asinh(v: Vector2): Vector2 {
        return {
            x: Math.asinh(v.x),
            y: Math.asinh(v.y)
        };
    }

    /**
     * Returns the cosine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The cosine of the `v` parameter.
     */
    export function cos(v: Vector2): Vector2 {
        return {
            x: Math.cos(v.x),
            y: Math.cos(v.y)
        };
    }

    /**
     * Returns the arccosine of the specified vector.
     * @param v The specified vector. Each component should be a value within the range of -1 to 1.
     * @returns The arccosine of the `v` parameter.
     */
    export function acos(v: Vector2): Vector2 {
        return {
            x: Math.acos(v.x),
            y: Math.acos(v.y)
        };
    }

    /**
     * Returns the hyperbolic cosine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The hyperbolic cosine of the `v` parameter.
     */
    export function cosh(v: Vector2): Vector2 {
        return {
            x: Math.cosh(v.x),
            y: Math.cosh(v.y)
        };
    }

    /**
     * Returns the hyperbolic arccosine of the specified vector.
     * @param v The specified vector. Each component should be a value within the range of -1 to 1.
     * @returns The hyperbolic arccosine of the `v` parameter.
     */
    export function acosh(v: Vector2): Vector2 {
        return {
            x: Math.acosh(v.x),
            y: Math.acosh(v.y)
        };
    }

    /**
     * Returns the tangent of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The tangent of the `v` parameter.
     */
    export function tan(v: Vector2): Vector2 {
        return {
            x: Math.tan(v.x),
            y: Math.tan(v.y)
        };
    }

    /**
     * Returns the arctangent of the specified vector.
     * @param v The specified vector.
     * @returns The arctangent of the `v` parameter. This value is within the range of -π/2 to π/2.
     */
    export function atan(v: Vector2): Vector2 {
        return {
            x: Math.atan(v.x),
            y: Math.atan(v.y)
        };
    }

    /**
     * Returns the hyperbolic tangent of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The hyperbolic tangent of the `v` parameter.
     */
    export function tanh(v: Vector2): Vector2 {
        return {
            x: Math.tanh(v.x),
            y: Math.tanh(v.y)
        };
    }

    /**
     * Returns the hyperbolic arctangent of the specified vector.
     * @param v The specified vector.
     * @returns The hyperbolic arctangent of the `v` parameter. 
     */
    export function atanh(v: Vector2): Vector2 {
        return {
            x: Math.atanh(v.x),
            y: Math.atanh(v.y)
        };
    }

    /**
     * Returns the dot product of two vectors.
     * @param u The first vector.
     * @param v The second vector.
     * @returns The dot product of `u` and `v`.
     */
    export function dot(u: Vector2, v: Vector2): number {
        return u.x * v.x + u.y * v.y;
    }

    /**
     * Returns the wedge product of two vectors.
     * @param u The first vector.
     * @param v The second vector.
     * @returns The wedge product of `u` and `v`.
     */
    export function wedge(u: Vector2, v: Vector2): number {
        return u.x * v.y - u.y * v.x;
    }

    /**
     * Returns the length of the specified vector.
     * @param v The specified vector.
     * @returns A scalar that represents the length of `v`.
     */
    export function length(v: Vector2): number {
        return Math.hypot(v.x, v.y);
    }

    /**
     * Normalizes the specified vector according to `v` / length(`v`).
     * @param v The specified vector.
     * @returns The normalized vector `v`.
     */
    export function normalize(v: Vector2): Vector2 {
        return div(v, length(v));
    }

    /**
     * Returns a distance scalar between two vectors.
     * @param u The first vector to compare.
     * @param v The second vector to compare.
     * @returns A scalar value that represents the distance between `u` and `v`.
     */
    export function distance(u: Vector2, v: Vector2): number {
        return length(sub(u, v));
    }

    /**
     * Projects a vector `u` onto a vector `v`.
     * @param u The first value.
     * @param v The second value.
     * @returns The vector projection of `u` onto `v`.
     */
    export function project(u: Vector2, v: Vector2): Vector2 {
        return mul(v, dot(u, v) / dot(v, v));
    }

    /**
     * Gets the rejection of a vector `u` from a vector `v`.
     * @param u The first value.
     * @param v The second value.
     * @returns The vector rejection of `u` from `v`.
     * @remarks This function is equivalent to *u* - project(*u*, *v*).
     */
    export function reject(u: Vector2, v: Vector2): Vector2 {
        return sub(u, project(u, v));
    }

    /**
     * Returns a reflection vector using an incident ray and a surface normal.
     * @param i An incident vector.
     * @param n A normal vector.
     * @returns A reflection vector.
     * @remarks This function calculates the reflection vector using the following formula: *v* = *i* - 2 * *n* * dot(*i*, *n*).
     */
    export function reflect(i: Vector2, n: Vector2): Vector2 {
        return sub(i, mul(n, 2 * dot(n, i)));
    }

    /**
     * Returns a refraction vector using an incident ray, a surface normal, and a refraction index.
     * @param i An incident direction vector.
     * @param n A surface normal vector.
     * @param e The ratio of refractive indices between the incident medium and the refracting medium.
     * @returns A refraction vector.
     */
    export function refract(i: Vector2, n: Vector2, e: number): Vector2 {
        const cosi = -dot(i, n);
        const sin2t = e * e * (1 - cosi * cosi);
        const cost = Math.sqrt(1 - sin2t);
        return add(mul(i, e), mul(n, e * cosi - cost));
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
    export function lerp(u: Vector2, v: Vector2, t: number): Vector2 {
        if (t === 0) return u;
        if (t === 1) return v;
        return {
            x: u.x + t * (v.x - u.x),
            y: u.y + t * (v.y - u.y)
        };
    }

    /**
     * Performs a spherical linear interpolation.
     * @param u The first unit vector.
     * @param v The second unit vector.
     * @param t A value that spherically interpolates between `u` and `v`.
     * @returns The result of the spherical linear interpolation.
     */
    export function slerp(u: Vector2, v: Vector2, t: number): Vector2 {
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
     * Rotates a vector `v` by angle `t`.
     * @param v The vector to be rotated.
     * @param t The angle in radians to rotate.
     * @returns The input parameter `v` rotated by the specified angle `t`.
     */
    export function rotate(v: Vector2, t: number): Vector2 {
        const cost = Math.cos(t), sint = Math.sin(t);
        const rot = Mat2.from([
            cost, -sint,
            sint,  cost
        ]);
        return Mat2.mul(rot, v);
    }
}