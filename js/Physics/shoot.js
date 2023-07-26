import Projectile from "../Entities/Projectile.js";

export function shoot(e, character, projectiles) {
    const angle = Math.atan2(e.clientY - character.y, e.clientX - character.x);
    const velocity = {
        x: Math.cos(angle) * 20,
        y: Math.sin(angle) * 20
    }

    projectiles.push(new Projectile(character.x, character.y, velocity, 5, "red"));
}