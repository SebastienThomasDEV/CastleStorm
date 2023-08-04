

export function spawnEnemies(canvas, game, enemyClass) {
    if (game.isLooping === false) {
        return;
    }
    return setInterval((id) => {
        const randomRadius = Math.random() * 30 + 10;
        const randomSpeed = Math.random() * 2 + 1;
        const randomColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
        const randomHealth = Math.random() * 30 + 20;
        let x;
        let y;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - randomRadius : canvas.width + randomRadius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - randomRadius : canvas.height + randomRadius;
        }
        const enemy = new enemyClass(
            x,
            y,
            randomRadius,
            randomColor,
            randomHealth,
            { x: 0, y: 0 },
            randomSpeed,
        );
        game.enemies.push(enemy);
    }, 3000);
}
