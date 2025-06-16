import { Vector3 } from "@minecraft/server";
import { Vec3 } from "./vector3"

export interface Matrix3 {
    m11: number, m12: number, m13: number,
    m21: number, m22: number, m23: number,
    m31: number, m32: number, m33: number
}

/**
 * Includes various 3x3 matrix functions and values.
 */
export namespace Mat3 {
    /**
     * The identity matrix.
     * 
     * Value:
     * 
     * **[`1`, `0`, `0`]**
     * 
     * **[`0`, `1`, `0`]**
     * 
     * **[`0`, `0`, `1`]**
     */
    export const Identity: Matrix3 = {
        m11: 1, m12: 0, m13: 0,
        m21: 0, m22: 1, m23: 0,
        m31: 0, m32: 0, m33: 1
    }

    /**
     * Determines if a value implements the {@link Matrix3} interface.
     * @param m The specified value.
     * @returns Returns **True** if the value contains the `Matrix3` properties, 
     * otherwise **False**.
     */
    export function isMatrix3(m: any): m is Matrix3 {
        return typeof m === "object"
            && 'm11' in m && 'm12' in m && 'm13' in m
            && 'm21' in m && 'm22' in m && 'm23' in m
            && 'm31' in m && 'm32' in m && 'm33' in m;
    }

    /**
     * Constructs a {@link Matrix3} from an array of numbers.
     */
    export function from(m: number[]): Matrix3;
    /**
     * Constructs a {@link Matrix3} from three column vectors.
     * @param u The first vector.
     * @param v The second vector.
     * @param w The third vector.
     */
    export function from(u: Vector3, v: Vector3, w: Vector3): Matrix3;
    export function from(u: unknown, v?: Vector3, w?: Vector3): Matrix3 {
        if (Array.isArray(u) && u.length >= 9) return {
            m11: u[0], m12: u[1], m13: u[2],
            m21: u[3], m22: u[4], m23: u[5],
            m31: u[6], m32: u[7], m33: u[8]
        };
        if (Vec3.isVector3(u) && v && w) return {
            m11: u.x, m12: v.x, m13: w.x,
            m21: u.y, m22: v.y, m23: w.y,
            m31: u.z, m32: v.z, m33: w.z
        };
        throw new Error("Invalid input values for matrix construction.");
    }

    /**
     * Returns the first column vector in a matrix.
     * @param m The specified matrix.
     */
    export function c1(m: Matrix3): Vector3 {
        return {
            x: m.m11,
            y: m.m21,
            z: m.m31
        };
    }

    /**
     * Returns the second column vector in a matrix.
     * @param m The specified matrix.
     */
    export function c2(m: Matrix3): Vector3 {
        return {
            x: m.m12,
            y: m.m22,
            z: m.m32
        };
    }

    /**
     * Returns the third column vector in a matrix.
     * @param m The specified matrix.
     */
    export function c3(m: Matrix3): Vector3 {
        return {
            x: m.m13,
            y: m.m23,
            z: m.m33
        };
    }

    /**
     * Returns the first row vector in a matrix.
     * @param m The specified matrix.
     */
    export function r1(m: Matrix3): Vector3 {
        return {
            x: m.m11,
            y: m.m12,
            z: m.m13
        };
    }

    /**
     * Returns the second row vector in a matrix.
     * @param m The specified matrix.
     */
    export function r2(m: Matrix3): Vector3 {
        return {
            x: m.m21,
            y: m.m22,
            z: m.m23
        };
    }

    /**
     * Returns the third row vector in a matrix.
     * @param m The specified matrix.
     */
    export function r3(m: Matrix3): Vector3 {
        return {
            x: m.m31,
            y: m.m32,
            z: m.m33
        };
    }

    /**
     * Multiplies a matrix by a scalar value.
     * @param m The specified matrix.
     * @param s The specified scalar.
     */
    export function mul(m: Matrix3, s: number): Matrix3;
    /**
     * Multiplies a vector by a matrix.
     * @param m The specified matrix.
     * @param v The specified vector.
     * @returns The result of the matrix/vector product between `m` and `v`.
     */
    export function mul(m: Matrix3, v: Vector3): Vector3;
    /**
     * Multiplies a matrix by another matrix.
     * @param m The multiplier matrix.
     * @param n The multiplicand matrix.
     */
    export function mul(m: Matrix3, n: Matrix3): Matrix3;
    export function mul(m: Matrix3, t: Matrix3 | Vector3 | number): Matrix3 | Vector3 {
        if (isMatrix3(t)) return {
            m11: Vec3.dot(r1(m), c1(t)),
            m12: Vec3.dot(r1(m), c2(t)),
            m13: Vec3.dot(r1(m), c3(t)),
            m21: Vec3.dot(r2(m), c1(t)),
            m22: Vec3.dot(r2(m), c2(t)),
            m23: Vec3.dot(r2(m), c3(t)),
            m31: Vec3.dot(r3(m), c1(t)),
            m32: Vec3.dot(r3(m), c2(t)),
            m33: Vec3.dot(r3(m), c3(t))
        };
        else if (Vec3.isVector3(t)) return {
            x: Vec3.dot(r1(m), t),
            y: Vec3.dot(r2(m), t),
            z: Vec3.dot(r3(m), t)
        };
        else return {
            m11: m.m11 * t, m12: m.m12 * t, m13: m.m13 * t,
            m21: m.m21 * t, m22: m.m22 * t, m23: m.m23 * t,
            m31: m.m31 * t, m32: m.m32 * t, m33: m.m33 * t
        };
    }

    /**
     * Returns the trace of a matrix.
     * @param m The specified matrix.
     */
    export function trace(m: Matrix3): number {
        return m.m11 + m.m22 + m.m33;
    }

    /**
     * Computes the determinant of a matrix.
     * @param m The specified matrix.
     */
    export function determinant(m: Matrix3): number {
        return m.m11 * m.m22 * m.m33 + m.m21 * m.m32 * m.m13 + m.m31 * m.m12 * m.m23
             - m.m13 * m.m22 * m.m31 - m.m23 * m.m32 * m.m11 - m.m33 * m.m12 * m.m21;
    }
    
    /**
     * Transposes a matrix.
     * @param m The specified matrix.
     */
    export function transpose(m: Matrix3): Matrix3 {
        return {
            m11: m.m11, m12: m.m21, m13: m.m31,
            m21: m.m12, m22: m.m22, m23: m.m32,
            m31: m.m13, m32: m.m23, m33: m.m33
        };
    }

    /**
     * Returns the cofactor matrix formed from a given matrix.
     * @param m The specified matrix.
     */
    export function cofactor(m: Matrix3): Matrix3 {
        return {
            m11: m.m22 * m.m33 - m.m23 * m.m32,
            m12: m.m23 * m.m31 - m.m21 * m.m33,
            m13: m.m21 * m.m32 - m.m22 * m.m31,
            m21: m.m13 * m.m32 - m.m12 * m.m33,
            m22: m.m11 * m.m33 - m.m13 * m.m31,
            m23: m.m12 * m.m31 - m.m11 * m.m32,
            m31: m.m12 * m.m23 - m.m13 * m.m22,
            m32: m.m13 * m.m21 - m.m11 * m.m23,
            m33: m.m11 * m.m22 - m.m12 * m.m21
        };
    }

    /**
     * Returns the adjugate matrix formed from a given matrix.
     * @param m The specified matrix.
     */
    export function adjugate(m: Matrix3): Matrix3 {
        return {
            m11: m.m22 * m.m33 - m.m23 * m.m32,
            m12: m.m13 * m.m32 - m.m12 * m.m33,
            m13: m.m12 * m.m23 - m.m13 * m.m22,
            m21: m.m23 * m.m31 - m.m21 * m.m33,
            m22: m.m11 * m.m33 - m.m13 * m.m31,
            m23: m.m13 * m.m21 - m.m11 * m.m23,
            m31: m.m21 * m.m32 - m.m22 * m.m31,
            m32: m.m12 * m.m31 - m.m11 * m.m32,
            m33: m.m11 * m.m22 - m.m12 * m.m21
        };
    }

    /**
     * Computes the inverse of a given matrix.
     * @param m The specified matrix.
     * @throws Throws an error when the matrix is not invertible.
     */
    export function inverse(m: Matrix3): Matrix3 {
        const det = determinant(m);
        if (det === 0) throw new Error("Matrix is not invertible.");
        return mul(adjugate(m), 1 / det);
    }

    /**
     * Constructs an axis-aligned Tangent-Normal-Binormal Matrix around a given normal vector.
     * @param n The specified normal vector.
     * @returns A TNB Matrix based on the specified vector.
     */
    export function buildTNB(n: Vector3): Matrix3 {
        const t = Math.abs(n.y) === 1 ? Vec3.East :
        Vec3.normalize(Vec3.from(n.z, 0, -n.x));
        const b = Vec3.cross(n, t);
        return from(t, n, b);
    }
}
