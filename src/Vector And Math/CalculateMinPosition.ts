import { StructureRotation, Vector3 } from "@minecraft/server";
import { Vec3 } from "./math";

/**
 * Rotates a given offset vector (offset) based on a specified StructureRotation (None, 90°, 180°, or 270° clockwise).
 * @param offset 
 * @param rotation 
 * @returns {Vector3}
 */
function rotateOffset(offset: Vector3, rotation: StructureRotation): Vector3 {
    switch (rotation) {
        case StructureRotation.None:
            return offset;
        case StructureRotation.Rotate90:
            return { x: -offset.z, y: offset.y, z: offset.x };
        case StructureRotation.Rotate180:
            return { x: -offset.x, y: offset.y, z: -offset.z };
        case StructureRotation.Rotate270:
            return { x: offset.z, y: offset.y, z: -offset.x };
        default:
            return offset;
    }
}

/**
 * Calculates the minimum world position (i.e. the corner of the bounding box) where a rotated structure should be placed so that a certain anchor point (anchorOffset) within the structure aligns with the given world position (placementPos).
 * @param placementPos - the world position where the anchor should end up.
 * @param anchorOffset - the position of the anchor point inside the structure (relative to its local origin).
 * @param bounds - defining the local bounds of the structure.
 * @param rotation - the applied structure rotation.
 * @returns {Vector3}
 */
export function calculateMinPosition(
    placementPos: Vector3,
    anchorOffset: Vector3,
    bounds: { min: Vector3; max: Vector3 },
    rotation: StructureRotation
): Vector3 {
    const rotatedOffset = rotateOffset(anchorOffset, rotation);
    
    const structureSize = {
        x: bounds.max.x - bounds.min.x,
        y: bounds.max.y - bounds.min.y,
        z: bounds.max.z - bounds.min.z
    };
    
    let minPos = Vec3.sub(placementPos, rotatedOffset);
    
    switch (rotation) {
        case StructureRotation.Rotate90:
            minPos = Vec3.sub(minPos, { x: structureSize.z, y: 0, z: 0 });
            break;
        case StructureRotation.Rotate180:
            minPos = Vec3.sub(minPos, { x: structureSize.x, y: 0, z: structureSize.z });
            break;
        case StructureRotation.Rotate270:
            minPos = Vec3.sub(minPos, { x: 0, y: 0, z: structureSize.x });
            break;
    }
    
    return minPos;
}