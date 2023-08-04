export function move(character, keyPresses) {
    // faire que le personnage ne puisse pas sortir de la map
    if (keyPresses.z) {
        if (character.targetY > 0) {
            character.targetY -= character.speed;
        } else {
            character.targetY = 0;
        }

    } else if (keyPresses.s) {
        if (character.targetY < window.innerHeight) {
            character.targetY += character.speed;
        } else {
            character.targetY = window.innerHeight;
        }
    }
    if (keyPresses.q) {
        if (character.targetX > 0) {
            character.targetX -= character.speed;
        } else {
            character.targetX = 0;
        }
    } else if (keyPresses.d) {
        if (character.targetX < window.innerWidth) {
            character.targetX += character.speed;
        } else {
            character.targetX = window.innerWidth;
        }
    }
}

export function dash(character, keyPresses) {
    if (keyPresses[" "]) {
        character.x = character.targetX;
        character.y = character.targetY;
    }
}