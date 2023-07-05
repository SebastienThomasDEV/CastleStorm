export function move(e, character, faceDirections) {
    if (e.code === "KeyA") { // Flèche gauche
        character.targetX -= 10;
        character.faceDirection = faceDirections.left;
    } else if (e.code === "KeyD") { // Flèche droite
        character.targetX += 10;
        character.faceDirection = faceDirections.right;
    } else if (e.code === "KeyW") { // Flèche haut
        character.targetY -= 10;
        character.faceDirection = faceDirections.up;
    } else if (e.code === "KeyS") { // Flèche bas
        character.targetY += 10;
        character.faceDirection = faceDirections.down;
    }
}