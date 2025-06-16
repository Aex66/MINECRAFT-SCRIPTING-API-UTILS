import { Vector3 } from "@minecraft/server";
/**
 * Accurately gets whether the attacker is in front, back, left, or right of the victim.
 * @param victim - The victim being hit 
 * @param attacker - The attacker
 */
export function getHitDirection(victim: { location: Vector3, yaw: number }, attacker: { location: Vector3 }): 'front' | 'back' | 'left' | 'right' {
  const dx = attacker.location.x - victim.location.x;
  const dz = attacker.location.z - victim.location.z;

  const length = Math.sqrt(dx * dx + dz * dz);
  if (length === 0) return 'front';

  const dirToAttacker = { x: dx / length, z: dz / length };

  const yawRad = victim.yaw * (Math.PI / 180);

  const facing = {
    x: -Math.sin(yawRad),
    z: Math.cos(yawRad)
  };

  const dot = facing.x * dirToAttacker.x + facing.z * dirToAttacker.z;
  const cross = facing.x * dirToAttacker.z - facing.z * dirToAttacker.x;

  const tolerance = 0.5;

  if (dot > tolerance) return 'front';
  if (dot < -tolerance) return 'back';
  if (cross > 0) return 'left';
  return 'right';
}