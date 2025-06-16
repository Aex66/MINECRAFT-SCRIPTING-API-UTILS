import { Vector2, Vector3 } from "@minecraft/server";

/**
 * Includes various methods for generating random vectors from different distributions.
 */
export namespace RandVec {
    /**
     * Generates two pseudorandom numbers between 0 and 1.
     * @returns A two-dimensional vector with pseudorandom components.
     */
    export function random2(): Vector2 {
        return {
            x: Math.random(),
            y: Math.random()
        };
    }
    
    /**
     * Generates three pseudorandom numbers between 0 and 1.
     * @returns A three-dimensional vector with pseudorandom components.
     */
    export function random3(): Vector3 {
        return {
            x: Math.random(),
            y: Math.random(),
            z: Math.random()
        };
    }

    /**
     * Generates a uniformly distributed random point on a circle.
     * @returns A random uniformly distributed point in a circle.
     */
    export function circle(): Vector2 {
        const phi = Math.random() * Math.PI * 2;
        return {
            x: Math.cos(phi),
            y: Math.sin(phi)
        };
    }

    /**
     * Generates a uniformly distributed random point within a disk.
     * @returns A random uniformly distributed point on a disk.
     */
    export function disk(): Vector2 {
        const rand = random2();
        const phi = rand.x * Math.PI * 2;
        const radius = Math.sqrt(rand.y);
        return {
            x: radius * Math.cos(phi),
            y: radius * Math.sin(phi)
        };
    }

    /**
     * Generates a uniformly distributed random point on the surface of a sphere.
     * @remarks The y-axis is treated as the zenith in this distribution.
     * @returns A random uniformly distributed point on a sphere.
     */
    export function sphere(): Vector3 {
        const rand = random2();
        const phi = rand.x * Math.PI * 2;
        const sint = 2 * Math.sqrt(rand.y * (1 - rand.y));
        return {
            x: Math.cos(phi) * sint,
            y: 1 - 2 * rand.y,
            z: Math.sin(phi) * sint
        };
    }

    /**
     * Generates a uniformly distributed random point on the surface of a hemisphere.
     * @remarks The y-axis is treated as the zenith in this distribution.
     * @returns A random uniformly distributed point on a hemisphere.
     */
    export function hemisphere(): Vector3 {
        const rand = random2();
        const phi = rand.x * Math.PI * 2;
        const sint = Math.sqrt(rand.y * (2 - rand.y));
        return {
            x: Math.cos(phi) * sint,
            y: 1 - rand.y,
            z: Math.sin(phi) * sint
        };
    }

    /**
     * Generates a randomly distributed point on the surface of a cosine-weighted hemisphere.
     * @remarks The y-axis is treated as the zenith in this distribution.
     * @returns A random point on a cosine-weighted hemisphere.
     */
    export function cosHemisphere(): Vector3 {
        const rand = random2();
        const phi = rand.x * Math.PI * 2;
        const sint = Math.sqrt(rand.y);
        return {
            x: Math.cos(phi) * sint,
            y: Math.sqrt(1 - rand.y),
            z: Math.sin(phi) * sint
        };
    }

    /**
     * Generates a uniformly distributed random point on the surface of a spherical cap.
     * @remarks The y-axis is treated as the zenith in this distribution.
     * @param t The maximum deviation angle from the zenith on the cap.
     * @returns A random uniformly distributed point on a spherical cap.
     */
    export function cap(t: number): Vector3 {
        const rand = random2();
        const phi = rand.x * Math.PI * 2;
        const u = rand.y * (1 - Math.cos(t));
        const sint = Math.sqrt(u * (2 - u));
        return {
            x: Math.cos(phi) * sint,
            y: 1 - u,
            z: Math.sin(phi) * sint
        };
    }
}