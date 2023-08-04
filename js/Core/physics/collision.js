export function checkCollision(projectile, enemy, score) {
    if (
        projectile.x < enemy.x + enemy.width // collision à droite
        && projectile.y < enemy.y + enemy.height // collision en bas
        && projectile.x + projectile.width > enemy.x  // collision à gauche
        && projectile.y + projectile.height > enemy.y // collision en haut
        && projectile.isFired
    ) {
        enemy.isHit = true;
        projectile.isFired = false;
        return score + 1;
    }
    return score;
}