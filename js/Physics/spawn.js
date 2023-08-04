

export function spawnEnemies(canvas, gameVariables, EnemyModel) {
    if (gameVariables.isLooping === false) {
        return;
    }
    return setInterval(() => {
        const radius = Math.random() * 30 + 10;
        let x;
        let y;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        const angle = Math.atan2(gameVariables.character.model.y - y, gameVariables.character.model.x - x);
        const velocity = {
            x: Math.cos(angle) * 10,
            y: Math.sin(angle) * 10
        }
        gameVariables.enemies.push(new EnemyModel(x, y, radius, "blue", velocity, Math.ceil(3 * Math.random())));
    }, 1000);
}
