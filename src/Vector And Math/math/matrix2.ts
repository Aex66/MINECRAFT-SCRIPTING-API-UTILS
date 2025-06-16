import { Vector2 } from "@minecraft/server";
import { Vec2 } from "./vector2";

export interface Matrix2 {
    m11: number, m12: number,
    m21: number, m22: number
}

/**
 * Includes various 2x2 matrix functions and values.
 */
export namespace Mat2 {
    /**
     * The identity matrix.
     * 
     * Value:
     * 
     * **[`1`, `0`]**
     * 
     * **[`0`, `1`]**
     */
    export const Identity: Matrix2 = {
        m11: 1, m12: 0,
        m21: 0, m22: 1,
    }

    /**
     * Determines if a value implements the {@link Matrix2} interface.
     * @param m The specified value.
     * @returns Returns **True** if the value contains the `Matrix2` properties, 
     * otherwise **False**.
     */
    export function isMatrix2(m: any): m is Matrix2 {
        return typeof m === "object"
            && 'm11' in m && 'm12' in m
            && 'm21' in m && 'm22' in m;
    }

    /**
     * Constructs a {@link Matrix2} from an array of numbers.
     */
    export function from(m: number[]): Matrix2;
    /**
     * Constructs a {@link Matrix2} from two column vectors.
     * @param u The first vector.
     * @param v The second vector.
     */
    export function from(u: Vector2, v: Vector2): Matrix2;
    export function from(u: unknown, v?: Vector2): Matrix2 {
        if (Array.isArray(u) && u.length >= 4) return {
            m11: u[0], m12: u[1],
            m21: u[2], m22: u[3]
        };
        if (Vec2.isVector2(u) && v) return {
            m11: u.x, m12: v.x,
            m21: u.y, m22: v.y
        };
        throw new Error("Invalid input values for matrix construction.");
    }

    /**
     * Returns the first column vector in a matrix.
     * @param m The specified matrix.
     */
    export function c1(m: Matrix2): Vector2 {
        return {
            x: m.m11,
            y: m.m21
        };
    }

    /**
     * Returns the second column vector in a matrix.
     * @param m The specified matrix.
     */
    export function c2(m: Matrix2): Vector2 {
        return {
            x: m.m12,
            y: m.m22
        };
    }

    /**
     * Returns the first row vector in a matrix.
     * @param m The specified matrix.
     */
    export function r1(m: Matrix2): Vector2 {
        return {
            x: m.m11,
            y: m.m12
        };
    }

    /**
     * Returns the second row vector in a matrix.
     * @param m The specified matrix.
     */
    export function r2(m: Matrix2): Vector2 {
        return {
            x: m.m21,
            y: m.m22
        };
    }

    /**
     * Multiplies a matrix by a scalar value.
     * @param m The specified matrix.
     * @param s The specified scalar.
     */
    export function mul(m: Matrix2, s: number): Matrix2;
    /**
     * Multiplies a vector by a matrix.
     * @param m The specified matrix.
     * @param v The specified vector.
     * @returns The result of the matrix/vector product between `m` and `v`.
     */
    export function mul(m: Matrix2, v: Vector2): Vector2;
    /**
     * Multiplies a matrix by another matrix.
     * @param m The multiplier matrix.
     * @param n The multiplicand matrix.
     */
    export function mul(m: Matrix2, n: Matrix2): Matrix2;
    export function mul(m: Matrix2, t: Matrix2 | Vector2 | number): Matrix2 | Vector2 {
        if (isMatrix2(t)) return {
            m11: Vec2.dot(r1(m), c1(t)),
            m12: Vec2.dot(r1(m), c2(t)),
            m21: Vec2.dot(r2(m), c1(t)),
            m22: Vec2.dot(r2(m), c2(t)),
        };
        else if (Vec2.isVector2(t)) return {
            x: Vec2.dot(r1(m), t),
            y: Vec2.dot(r2(m), t)
        };
        else return {
            m11: m.m11 * t, m12: m.m12 * t,
            m21: m.m21 * t, m22: m.m22 * t
        };
    }

    /**
     * Returns the trace of a matrix.
     * @param m The specified matrix.
     */
    export function trace(m: Matrix2): number {
        return m.m11 + m.m22;
    }

    /**
     * Computes the determinant of a matrix.
     * @param m The specified matrix.
     */
    export function determinant(m: Matrix2): number {
        return m.m11 * m.m22 - m.m12 * m.m21;
    }
    
    /**
     * Transposes a matrix.
     * @param m The specified matrix.
     */
    export function transpose(m: Matrix2): Matrix2 {
        return {
            m11: m.m11, m12: m.m21,
            m21: m.m12, m22: m.m22
        };
    }

    /**
     * Returns the cofactor matrix formed from a given matrix.
     * @param m The specified matrix.
     */
    export function cofactor(m: Matrix2): Matrix2 {
        return {
            m11:  m.m22, m12: -m.m21,
            m21: -m.m12, m22:  m.m11
        };
    }

    /**
     * Returns the adjugate matrix formed from a given matrix.
     * @param m The specified matrix.
     */
    export function adjugate(m: Matrix2): Matrix2 {
        return {
            m11:  m.m22, m12: -m.m12,
            m21: -m.m21, m22:  m.m11
        };
    }

    /**
     * Computes the inverse of a given matrix.
     * @param m The specified matrix.
     * @throws Throws an error when the matrix is not invertible.
     */
    export function inverse(m: Matrix2): Matrix2 {
        const det = determinant(m);
        if (det === 0) throw new Error("Matrix is not invertible.");
        return mul(adjugate(m), 1 / det);
    }
}