
export function shoot(e, game, projectileClass) {
    const angle = Math.atan2(e.clientY - game.character.model.y, e.clientX - game.character.model.x);
    const velocity = {
        x: Math.cos(angle) * 20,
        y: Math.sin(angle) * 20,
        angle: angle
    }
    game.projectiles.push(new projectileClass(game.character.model.x, game.character.model.y, velocity,5,"red"));
}
