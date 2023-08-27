import Character from "./Entities/Character.js";
import Enemy from "./Entities/Enemy.js";
import Loot from "./Entities/Loot.js";
import Projectile from "./Entities/Projectile.js";
import {game, characterSprites, lootSprites} from "./Core/vars/game.js";
import {drawCharacterHpBar, drawHealthBar, drawPlayerStats, drawXpBar} from "./Core/ui/drawUI.js";
import {spawnEnemies} from "./Core/physics/spawn.js";
import {shoot} from "./Core/physics/shoot.js";
import {keyDownListener, keyUpListener, input} from "./Core/physics/movement.js";
import {loadImages} from "./Core/loader.js";



function drawGameIU(context, game) {
    drawXpBar(context, game);
    drawHealthBar(context, game);
    drawCharacterHpBar(context, game);
    drawPlayerStats(context, game);
}

function clearCanvas(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}


function updateMousePos(e, game) {
    game.mousePos = {
        x: e.clientX,
        y: e.clientY,
    }
}


// Initialisation du canvas html et du contexte 2d
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
// On définit la taille du canvas en fonction de la taille de la fenêtre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight
// On désactive l'anti-aliasing pour avoir des sprites pixelisés
context.imageSmoothingEnabled = false;
// On cache le canvas tant que le joueur n'a pas cliqué sur le bouton "Start"
canvas.style.display = "none"


// Initialisation du menu de démarrage du jeu et du bouton "Commencez"
const startMenu = document.getElementById("startMenu");
const startButton = document.getElementById("startButton");


let up, upLeft, upRight, down, downLeft, downRight, left, right;
[up, upLeft, upRight, down, downLeft, downRight, left, right] = await loadImages(characterSprites);
let potion, coin, pile, bag;
[potion, coin, pile, bag] = await loadImages(lootSprites);
let quiPlayerStats;
[quiPlayerStats] = await loadImages(["assets/img/gui/uu.png"]);
game.gui.playerStats = quiPlayerStats;
console.log("Sprites chargés");
game.character.sprites = {
    up: up,
    upLeft: upLeft,
    upRight: upRight,
    down: down,
    downLeft: downLeft,
    downRight: downRight,
    left: left,
    right: right
}
game.loots.sprites = {
    potion: potion,
    money: {
        coin: coin,
        pile: pile,
        bag: bag
    }
}
// On ajoute un évènement sur le bouton "Commencez" pour lancer le jeu
startButton.addEventListener("click", () => {
    // On cache le menu de démarrage et on affiche le canvas
    startMenu.style.display = "none";
    canvas.style.display = "block";
    // Apparition du personnage
    game.character.object = new Character(canvas.width / 2, canvas.height / 2, 10);
    // On lance le jeu
    gameLoop();
    game.isLooping = true;
    // Apparition des ennemis
    game.intervalInstances.push(spawnEnemies(canvas, game, Enemy));
    // On ajoute des évènements sur les touches du clavier
    window.onmousemove = (e) => game.isLooping ? updateMousePos(e, game) : null;
    window.addEventListener('keydown', (e) => game.isLooping ? keyDownListener(e, game) : null);
    window.addEventListener('keyup', (e) => game.isLooping ? keyUpListener(e, game) : null);
    document.addEventListener("mousedown", () => {
        if (game.isLooping) {
            game.character.inputs.click = true;
            if (!game.character.object.isShooting) {
                let idInterval = setInterval(() => {
                    game.character.object.shoot(game, Projectile);
                }, 40000 / game.character.object.fireRate);
                game.process.push(idInterval);
            }
        }
    });
    document.addEventListener("mouseup", (e) => {
        game.character.inputs.click = false;
        if (game.isLooping) {
            game.character.inputs.click = false;
            game.process.forEach((idInterval) => {
                clearInterval(idInterval);
            });
            game.process = [];
        }
    });
})



function gameLoop() {
    try {
        game.animationFrameId = requestAnimationFrame(gameLoop);
        clearCanvas(context, canvas);
        // On ajoute l'événement de déplacement du personnage
        input(game, gameLoop);
        // On actualise le personnage
        game.character.object.update(context, game);
        // On actualise les projectiles
        game.projectiles.forEach((projectile) => {
            projectile.update(context);
            if (projectile.x < 0 || projectile.x > canvas.width || projectile.y < 0 || projectile.y > canvas.height) {
                game.projectiles.splice(game.projectiles.indexOf(projectile), 1);
            }
        });
        // Pour chaque loot
        game.loots.instances.forEach((loot, index) => {
            // On actualise le loot
            loot.update(context, game);
            // On vérifie si le personnage est en collision avec le loot
            const distance = Math.hypot(game.character.object.x - loot.x, game.character.object.y - loot.y);
            if (distance - loot.radius - game.character.object.radius < 1) {
                game.loots.instances.splice(index, 1);
                if (loot.type === "health") {
                    game.character.object.heal(10)
                } else if (loot.type === "money") {
                    game.character.object.credit(10);
                }
            }
        });
        game.enemyProjectiles.forEach((projectile, index) => {
            projectile.update(context);
            const distance = Math.hypot(game.character.object.x - projectile.x, game.character.object.y - projectile.y);
            if (distance - projectile.radius - game.character.object.radius < 1) {
                game.enemyProjectiles.splice(index, 1);
                game.character.object.takeDamage(10);
            }
            if (projectile.x < 0 || projectile.x > canvas.width || projectile.y < 0 || projectile.y > canvas.height) {
                game.enemyProjectiles.splice(index, 1);
            }
        });
        game.enemies.forEach((enemy, index) => {
            enemy.update(context, game);
            if (!enemy.isShooting && enemy.behavior === "ranged") {
                enemy.shoot(game, Projectile);
            }
            // On vérifie si le personnage est en collision avec l'ennemi
            const distance = Math.hypot(
                game.character.object.x - enemy.x,
                game.character.object.y - enemy.y
            );
            // Si le personnage est en collision avec l'ennemi
            if (distance - enemy.radius - game.character.object.radius < 1) {
                // On vérifie si le personnage n'est pas déjà en train de se faire attaquer
                if (!game.character.object.isHit) {
                    game.character.object.takeDamage(enemy.attack);
                    game.character.object.isHit = true;
                    setTimeout(() => {
                        if (game.character.object) game.character.object.isHit = false;
                    }, 500);
                }
            }
            // Pour chaque projectile
            game.projectiles.forEach((projectile) => {
                // On vérifie si le projectile est en collision avec l'ennemi
                const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
                if (distance - enemy.radius - projectile.radius < 1) {
                    // Si oui, on retire les points de vie de l'ennemi
                    enemy.health -= game.character.object.attack;
                    // game.projectiles.splice(projectileIndex, 1);
                    enemy.color = "red";
                    setTimeout(() => {
                        enemy.color = "green"
                    }, 100);
                    // Si les points de vie de l'ennemi sont inférieurs ou égaux à 0 on le supprime
                    if (enemy.health <= 0) {
                        game.enemies.splice(index, 1);
                        enemy.dropLoot(game, Loot);
                        game.character.object.gainXp(10);
                    }
                }
            });
        });
        if (game.character.object.health.current <= 0) {
            location.reload();
        }
        drawGameIU(context, game);
    } catch (e) {
        cancelAnimationFrame(game.animationFrameId);
    }
}

