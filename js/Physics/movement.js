export function move(character, faceDirections, keyPresses) {
    if (keyPresses.z) {
        character.targetY -= character.speed;
        character.faceDirection = faceDirections.up;
    } else if (keyPresses.s) {
        character.targetY += character.speed;
        character.faceDirection = faceDirections.down;
    }
    if (keyPresses.q) {
        character.targetX -= character.speed;
        character.faceDirection = faceDirections.left;
    } else if (keyPresses.d) {
        character.targetX += character.speed;
        character.faceDirection = faceDirections.right;
    }
}