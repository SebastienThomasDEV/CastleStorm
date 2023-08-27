
export function spawnEnemies(canvas, game, enemyClass) {
    if (!game.isLooping) {
        return;
    }
    return setInterval(() => {
        const random = Math.random();
        const randomRadius = random * 30 + 10;
        const randomSpeed = random * 10 + 1;
        const randomColor = `hsl(${random * 360}, 50%, 50%)`;
        const randomHealth = random * 30 + 20;
        const randomBehavior = random < 0.5 ? 'ranged' : 'melee';
        let x;
        let y;
        if (Math.random() < 0.5) {
            x = random < 0.5 ? 0 - randomRadius : canvas.width + randomRadius;
            y = random * canvas.height;
        } else {
            x = random * canvas.width;
            y = random < 0.5 ? 0 - randomRadius : canvas.height + randomRadius;
        }
        const enemy = new enemyClass(
            x,
            y,
            randomRadius,
            randomColor,
            randomHealth,
            { x: 0, y: 0 },
            randomSpeed,
            randomBehavior,
        );
        game.enemies.push(enemy);
    }, 1000);
}
