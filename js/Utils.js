export function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args)
    }
}

export function clearCanvas(context, canvas, score) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

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