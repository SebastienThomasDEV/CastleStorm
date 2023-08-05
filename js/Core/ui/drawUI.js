export function drawCharacterHpBar(context, game) {
    context.beginPath();
    context.fillStyle = "red";
    context.rect(
        game.character.model.x - 20,
        game.character.model.y - 30,
        game.playerHealth.currentHealth / game.playerHealth.maxHealth * 40,
        5
    );
    context.fill();
    context.closePath();
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.rect(
        game.character.model.x - 20,
        game.character.model.y - 30,
        40,
        5
    );
    context.stroke();
    context.closePath();
}

export function drawHealthBar(context, game) {
    context.beginPath();
    context.fillStyle = "red";
    context.rect(10, 10, game.playerHealth.currentHealth / game.playerHealth.maxHealth * 200, 20);
    context.fill();
    context.closePath();
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.rect(10, 10, 200, 20);
    context.stroke();
    context.closePath();
}

export function drawXpBar(context, game) {
    context.beginPath();
    context.fillStyle = "lightgreen";
    context.rect(10, 50, game.playerLevel.currentXp / game.playerLevel.cap * 200, 20);
    context.fill();
    context.closePath();
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.rect(10, 50, 200, 20);
    context.stroke();
    context.closePath();
    context.beginPath();
}
