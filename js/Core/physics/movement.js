

export function input(game, spawn, gameLoop = null) {
    // faire que le personnage ne puisse pas sortir de la map
    if (game.character.inputs.z) {
        if (game.character.object.targetY > 0) {
            game.character.object.targetY -= game.character.object.speed;
        } else {
            game.character.object.targetY = 0;
        }

    } else if (game.character.inputs.s) {
        if (game.character.object.targetY < window.innerHeight) {
            game.character.object.targetY += game.character.object.speed;
        } else {
            game.character.object.targetY = window.innerHeight;
        }
    }
    if (game.character.inputs.q) {
        if (game.character.object.targetX > 0) {
            game.character.object.targetX -= game.character.object.speed;
        } else {
            game.character.object.targetX = 0;
        }
    } else if (game.character.inputs.d) {
        if (game.character.object.targetX < window.innerWidth) {
            game.character.object.targetX += game.character.object.speed;
        } else {
            game.character.object.targetX = window.innerWidth;
        }
    } else if (game.character.inputs.Escape) {
        cancelAnimationFrame(game.animationFrameId);
        Swal.fire({
            title: 'Menu de pause',
            text: 'Que voulez-vous faire ?',
            confirmButtonText: 'Reprendre',
            confirmButtonColor: '#3085d6',
            cancelButtonText: 'Quittez le jeu',
            cancelButtonColor: '#d33',
            showCancelButton: true,
            disableClose: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        }).then((result) => {
            game.animationFrameId = requestAnimationFrame(gameLoop);
            game.spawnProcess.forEach((intervalId) => {
                clearInterval(intervalId)
            });
            if (result.isConfirmed) {
                console.log("reprendre");
            } else {
                location.reload();
            }
        })
    }
}


export function keyDownListener(event, game) {
    game.character.inputs[event.key] = true;
}

export function keyUpListener(event, game) {
    game.character.inputs[event.key] = false;
}

