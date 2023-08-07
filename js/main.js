import Character from "./Entities/Character.js";
import Enemy from "./Entities/Enemy.js";
import Loot from "./Entities/Loot.js";
import Projectile from "./Entities/Projectile.js";
import {game, characterSprites, lootSprites} from "./Core/vars/game.js";
import {resetGame} from "./Core/functions/reset.js";
import {drawCharacterHpBar, drawHealthBar, drawXpBar} from "./Core/ui/drawUI.js";
import {spawnEnemies} from "./Core/physics/spawn.js";
import {shoot} from "./Core/physics/shoot.js";
import {move, dash, keyDownListener, keyUpListener} from "./Core/physics/movement.js";
import {loadImages} from "./Core/Loader.js";


function drawGameIU(context, game) {
    drawXpBar(context, game);
    drawHealthBar(context, game);
    drawCharacterHpBar(context, game);
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
    game.character.model = new Character(canvas.width / 2, canvas.height / 2, 10, "blue");
    // On lance le jeu
    gameLoop();
    game.isLooping = true;
    // Apparition des ennemis
    game.intervalInstances.push(spawnEnemies(canvas, game, Enemy));
    // On ajoute des évènements sur les touches du clavier
    window.onmousemove = (e) => game.isLooping ? updateMousePos(e, game) : null;
    window.addEventListener('keydown', (e) => game.isLooping ? keyDownListener(e, game) : null);
    window.addEventListener('keyup', (e) => game.isLooping ? keyUpListener(e, game) : null);
    document.addEventListener("click", (e) => game.isLooping ? shoot(e, game, Projectile) : null);
})







let requestId = 0;

function gameLoop() {
    try {
        requestId = requestAnimationFrame(gameLoop);
        clearCanvas(context, canvas);
        drawGameIU(context, game);
        // On ajoute l'événement de déplacement du personnage
        move(game);
        // On ajoute la mécanique de dash
        dash(game);
        // On actualise le personnage
        game.character.model.update(context, game);
        // On actualise les projectiles
        game.projectiles.forEach((projectile) => {
            projectile.update(context);
        });
        // Pour chaque loot
        game.loots.instances.forEach((loot, index) => {
            // On actualise le loot
            loot.update(context, game);
            // On vérifie si le personnage est en collision avec le loot
            const distance = Math.hypot(game.character.model.x - loot.x, game.character.model.y - loot.y);
            // Si le personnage est en collision avec le loot
            if (distance - loot.radius - game.character.model.radius < 1) {
                game.loots.instances.splice(index, 1);
                // On vérifie le type de loot
                if (loot.type === "health") {
                    // On ajoute de la vie au joueur
                    game.playerHealth.currentHealth += 20;
                    if (game.playerHealth.currentHealth > game.playerHealth.maxHealth) {
                        game.playerHealth.currentHealth = game.playerHealth.maxHealth;
                    }
                } else if (loot.type === "money") {
                    game.character.money += Math.floor(Math.random() * 10) + 1;
                }
            }
        });
        // Pour chaque ennemi
        game.enemies.forEach((enemy, index) => {
            // On actualise l'ennemi
            enemy.update(context, game);
            // On vérifie si le personnage est en collision avec l'ennemi
            const distance = Math.hypot(
                game.character.model.x - enemy.x,
                game.character.model.y - enemy.y
            );
            // Si le personnage est en collision avec l'ennemi
            if (distance - enemy.radius - game.character.model.radius < 1) {
                // On vérifie si le personnage n'est pas déjà en train de se faire attaquer
                if (!game.character.model.isHit) {
                    // Sinon, on retire des points de vie au personnage
                    game.playerHealth.currentHealth -= 20 - game.character.armor;
                    game.character.model.isHit = true;
                    setTimeout(() => {
                        if (game.character.model) game.character.model.isHit = false;
                    }, 500);
                }
                // On vérifie si le personnage n'a plus de points de vie
                if (game.playerHealth.currentHealth <= 0) {
                    // Si oui, on arrête la boucle de jeu et on affiche le menu de départ
                    cancelAnimationFrame(requestId);
                    canvas.style.display = "none";
                    startMenu.style.display = "flex";
                    resetGame(game);
                }
            }
            // Pour chaque projectile
            game.projectiles.forEach((projectile, projectileIndex) => {
                // On vérifie si le projectile est en collision avec l'ennemi
                const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
                if (distance - enemy.radius - projectile.radius < 1) {
                    // Si oui, on retire les points de vie de l'ennemi
                    enemy.health -= game.character.attack;
                    game.projectiles.splice(projectileIndex, 1);
                    enemy.color = "red";
                    setTimeout(() => {
                        enemy.color = "green"
                    }, 100);
                    // Si les points de vie de l'ennemi sont inférieurs ou égaux à 0 on le supprime
                    if (enemy.health <= 0) {
                        const type = Math.random() > 0.5 ? "health" : "money";
                        game.enemies.splice(index, 1);
                        game.playerLevel.currentXp += enemy.radius;
                        game.loots.instances.push(new Loot(enemy.x, enemy.y, type));
                        // On vérifie si le joueur a assez d'expérience pour passer au niveau supérieur
                        if (game.playerLevel.currentXp >= game.playerLevel.cap) {
                            game.playerLevel.currentXp = 0;
                            game.playerLevel.cap *= 1.5;
                            game.playerLevel.currentLevel += 1;
                            game.playerHealth.maxHealth += 5;
                            game.character.attack += 1;
                            game.character.armor += 1;
                        }
                    }
                }
            });
        });
    } catch (e) {
        cancelAnimationFrame(requestId);
    }
}


