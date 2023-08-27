export function drawCharacterHpBar(context, game) {
    context.beginPath();
    context.fillStyle = "red";
    context.rect(
        game.character.object.x - 20,
        game.character.object.y - 30,
        game.character.object.health.current / game.character.object.health.max * 40,
        5
    );
    context.fill();
    context.closePath();
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.rect(
        game.character.object.x - 20,
        game.character.object.y - 30,
        40,
        5
    );
    context.stroke();
    context.closePath();
}

export function drawHealthBar(context, game) {
    // On dessine la barre de vie du joueur en haut à gauche avec les valeurs actuelles de vie et de vie maximale,
    // au centre de la barre de vie
    context.beginPath();
    context.fillStyle = "red";
    context.rect(10, 10, game.character.object.health.current / game.character.object.health.max * 200, 20);
    context.fill();
    context.closePath();
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.rect(10, 10, 200, 20);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.font = "12px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(game.character.object.health.current  + "/" + game.character.object.health.max , 110, 25);
    context.closePath();
}

export function drawXpBar(context, game) {
    context.beginPath();
    context.fillStyle = "lightgreen";
    context.rect(10, 50, game.character.object.level.xp / game.character.object.level.cap * 200, 20);
    context.fill();
    context.closePath();
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.rect(10, 50, 200, 20);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.font = "12px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(Math.round(game.character.object.level.xp) + "/" + Math.round(game.character.object.level.cap), 110, 65);
    context.closePath();
}

export function drawPlayerStats(context, game) {
    context.beginPath();
    context.font = "12px Arial";
    context.fillStyle = "black";
    context.textAlign = "left";
    context.fillText("Level: " + game.character.object.level.current, 10, 90);
    context.fillText("Attack: " + game.character.object.attack, 10, 105);
    context.fillText("Defense: " + game.character.object.armor, 10, 120);
    context.fillText("Balance: " + game.character.object.balance, 10, 135);
    context.closePath();
}

