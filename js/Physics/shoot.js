import Projectile from "../Entities/Projectile.js";

export function shoot(e, character, projectiles, image) {
    const angle = Math.atan2(e.clientY - character.y, e.clientX - character.x);
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }
    projectiles.push(new Projectile(character.x, character.y, velocity, 5, "red", image));
}