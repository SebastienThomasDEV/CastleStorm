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

// export function dash(character, faceDirections, keyPresses) {
//     if (keyPresses[" "]) {
//         switch (character.faceDirection) {
//             case faceDirections.up:
//                 character.targetY -= character.speed;
//                 break;
//             case faceDirections.down:
//                 character.targetY += character.speed;
//                 break;
//             case faceDirections.left:
//                 character.targetX -= character.speed;
//                 break;
//             case faceDirections.right:
//                 character.targetX += character.speed;
//                 break;
//         }
//     }
// }