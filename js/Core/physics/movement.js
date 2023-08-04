export function move(game) {
    // faire que le personnage ne puisse pas sortir de la map
    const character = game.character.model;
    if (game.character.inputs.z) {
        if (game.character.model.targetY > 0) {
            game.character.model.targetY -= game.character.model.speed;
        } else {
            game.character.model.targetY = 0;
        }

    } else if (game.character.inputs.s) {
        if (game.character.model.targetY < window.innerHeight) {
            game.character.model.targetY += game.character.model.speed;
        } else {
            game.character.model.targetY = window.innerHeight;
        }
    }
    if (game.character.inputs.q) {
        if (game.character.model.targetX > 0) {
            game.character.model.targetX -= game.character.model.speed;
        } else {
            game.character.model.targetX = 0;
        }
    } else if (game.character.inputs.d) {
        if (game.character.model.targetX < window.innerWidth) {
            game.character.model.targetX += game.character.model.speed;
        } else {
            game.character.model.targetX = window.innerWidth;
        }
    }
}

export function dash(game) {
    if (game.character.inputs[" "]) {
        game.character.model.x = game.character.model.targetX;
        game.character.model.y = game.character.model.targetY;
    }
}

export function keyDownListener(event, game) {
    game.character.inputs[event.key] = true;
}
export function keyUpListener(event, game) {
    game.character.inputs[event.key] = false;
}

