import Character from "./Entities/Character.js";
import Enemy from "./Entities/Enemy.js";
import {Loot} from "./Entities/Loot.js";
import {loadImages} from "./Loader.js";
import {spawnEnemies} from "./Physics/spawn.js";
import {shoot} from "./Physics/shoot.js";
import {clearCanvas} from "./Map/CanvaMethods.js";
import {move, dash} from "./Physics/movement.js";
// import {move, dash} from "./Physics/movement.js";
import {keyDownListener, keyUpListener} from "./Utils/Utils.js";

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

// On charge les images du jeu
let faceUp, faceRight, faceLeft, faceDown, heart_full, heart_empty;
[faceUp, faceRight, faceLeft, faceDown, heart_full, heart_empty] = await loadImages([
    "./assets/img/character/faceup.png",
    "./assets/img/character/faceright.png",
    "./assets/img/character/faceleft.png",
    "./assets/img/character/facedown.png",
    "./assets/img/character/heart_full.png",
    "./assets/img/character/heart_empty.png"
])


// On initialise les variables du jeu
const gameVariables =  {
    isLooping: false,
    playerLevel: {
        cap: 200,
        currentXp: 0,
        currentLevel: 1
    },
    playerHealth: {
        cap: 100,
        maxHealth: 100,
        currentHealth: 100
    },
    character : {
        model: null,
        attack: 10,
        armor: 0,
        keyPresses: {
            z: false,
            q: false,
            s: false,
            d: false,
        },
        sprites: {
            body: {
                faceUp: faceUp,
                faceRight: faceRight,
                faceLeft: faceLeft,
                faceDown: faceDown
            },
            health: {
                heart_full: heart_full,
                heart_empty: heart_empty
            }
        }
    },
    projectiles: [],
    enemies: [],
    loots: [],
    intervalProcess: [],
    mousePos: {
        x: 0,
        y: 0
    }
}

// On ajoute un évènement sur le bouton "Commencez" pour lancer le jeu
startButton.addEventListener("click", () => {
    // On cache le menu de démarrage et on affiche le canvas
    startMenu.style.display = "none";
    canvas.style.display = "block";

    // Apparition du personnage
    gameVariables.character.model = new Character(canvas.width / 2, canvas.height / 2, 10, "blue", gameVariables.character.sprites.body.faceDown);

    // On lance le jeu
    gameLoop();
    gameVariables.isLooping = true;

    // Apparition des ennemis
    gameVariables.intervalProcess.push(spawnEnemies(canvas, gameVariables, Enemy));


    // On ajoute des évènements sur les touches du clavier
    window.onmousemove = (e) => gameVariables.isLooping ? (gameVariables.mousePos.x = e.clientX, gameVariables.mousePos.y = e.clientY) : null;
    window.addEventListener('keydown', (e) => gameVariables.isLooping ? keyDownListener(e, gameVariables.character.keyPresses ) : null);
    window.addEventListener('keyup', (e) => gameVariables.isLooping ? keyUpListener(e, gameVariables.character.keyPresses) : null);
    document.addEventListener("click", (e) => gameVariables.isLooping ? shoot(e, gameVariables.character.model, gameVariables.projectiles) : null);
})



function drawXpBar(context, canvas, gameVariables) {
    context.beginPath();
    context.fillStyle = "lightgreen";
    context.rect(10, 10, gameVariables.playerLevel.currentXp / gameVariables.playerLevel.cap * 200, 20);
    context.fill();
    context.closePath();
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.rect(10, 10, 200, 20);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.fillStyle = "black";
    context.font = "16px Arial";
    context.fillText(`Niv. ${gameVariables.playerLevel.currentLevel}`, 10, 50);
    context.closePath();
}

function drawCharacterStats(context, canvas, gameVariables) {
    drawHpBar(context, gameVariables);
    drawXpBar(context, canvas, gameVariables);
    drawStatsBar(context, gameVariables);
}

function drawStatsBar(context, gameVariables) {
    // On dessine le fond de la barre de stats
    context.beginPath();
    context.fillStyle = "lightgrey";
    context.rect(canvas.width - 210, 10, 200, 80);
    context.fill();
    context.closePath();
    // On dessine la barre de stats
    context.beginPath();
    context.fillStyle = "lightblue";
    context.rect(canvas.width - 210, 10, 200, 80);
    context.fill();
    context.closePath();
    // On dessine le contour de la barre de stats
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.rect(canvas.width - 210, 10, 200, 80);
    context.stroke();
    context.closePath();
    // On dessine le texte de la barre de stats
    context.beginPath();
    context.fillStyle = "black";
    context.font = "16px Arial";
    context.fillText(`Dmg. d'attaque : ${gameVariables.character.attack}`, canvas.width - 200, 40);
    context.fillText(`Armure : ${gameVariables.character.armor}`, canvas.width - 200, 60);
    context.fillText(`Vie max : ${gameVariables.playerHealth.maxHealth}`, canvas.width - 200, 80);
    context.closePath();
}


function drawHpBar(context, gameVariables) {
    context.beginPath();
    context.fillStyle = "red";
    context.rect(
        gameVariables.character.model.x - 20,
        gameVariables.character.model.y - 30,
        gameVariables.playerHealth.currentHealth / gameVariables.playerHealth.cap * 40,
        5
    );
    context.fill();
    context.closePath();
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.rect(
        gameVariables.character.model.x - 20,
        gameVariables.character.model.y - 30,
        40,
        5
    );
    context.stroke();
    context.closePath();
}




function resetGameVariables(gameVariables) {
    gameVariables.character.model = new Character(canvas.width / 2, canvas.height / 2, 10, "blue", gameVariables.character.sprites.body.faceDown);
    gameVariables.projectiles = [];
    gameVariables.enemies = [];
    gameVariables.loots = [];
    gameVariables.character.keyPresses = {
        z: false,
        q: false,
        s: false,
        d: false,
    };
    gameVariables.playerLevel = {
        cap: 200,
        currentXp: 0,
        currentLevel: 1
    };
    gameVariables.playerHealth = {
        cap: 100,
        maxHealth: 100,
        currentHealth: 100
    }
    gameVariables.character.attack = 10;
    gameVariables.character.armor = 0;
    gameVariables.isLooping = false;
    gameVariables.intervalProcess.forEach((interval) => {
        clearInterval(interval);
    });
    gameVariables.intervalProcess.length = 0;
}




let requestId = 0;

function gameLoop() {
    try {
        requestId = requestAnimationFrame(gameLoop);
        clearCanvas(context, canvas);
        drawCharacterStats(context, canvas, gameVariables);
        // On ajoute l'événement de déplacement du personnage
        move(gameVariables.character.model, gameVariables.character.keyPresses);
        // On ajoute la mécanique de dash
        dash(gameVariables.character.model, gameVariables.character.keyPresses);

        // On actualise le personnage
        gameVariables.character.model.update(context, gameVariables.mousePos);
        // On actualise les projectiles
        gameVariables.projectiles.forEach((projectile) => {
            projectile.update(context);
        });
        // Pour chaque loot
        gameVariables.loots.forEach((loot, index) => {
            // On actualise le loot
            loot.update(context);
            // On vérifie si le personnage est en collision avec le loot
            const distance = Math.hypot(gameVariables.character.model.x - loot.x, gameVariables.character.model.y - loot.y);
            // Si le personnage est en collision avec le loot
            if (distance - loot.radius - gameVariables.character.model.radius < 1) {
                gameVariables.loots.splice(index, 1);
                // On vérifie le type de loot
                if (loot.type === "health") {
                    // On ajoute de la vie au joueur
                    gameVariables.playerHealth.currentHealth += 20;
                    if (gameVariables.playerHealth.currentHealth > gameVariables.playerHealth.maxHealth) {
                        gameVariables.playerHealth.currentHealth = gameVariables.playerHealth.maxHealth;
                    }
                } else if (loot.type === "ammo") {
                    console.log("ammo")
                }
            }
        });
        // Pour chaque ennemi
        gameVariables.enemies.forEach((enemy, index) => {
            // On actualise l'ennemi
            enemy.update(context, gameVariables.character.model);
            // On vérifie si le personnage est en collision avec l'ennemi
            const distance = Math.hypot(
                gameVariables.character.model.x - enemy.x,
                gameVariables.character.model.y - enemy.y
            );
            // Si le personnage est en collision avec l'ennemi
            if (distance - enemy.radius - gameVariables.character.model.radius < 1) {
                // On vérifie si le personnage n'est pas déjà en train de se faire attaquer
                if (!gameVariables.character.model.isHit) {
                    // Sinon, on retire des points de vie au personnage
                    gameVariables.playerHealth.currentHealth -= 20 - gameVariables.character.armor;
                    gameVariables.character.model.isHit = true;
                    setTimeout(() => {
                        gameVariables.character.model.isHit = false;
                    }, 500);
                }
                // On vérifie si le personnage n'a plus de points de vie
                if (gameVariables.playerHealth.currentHealth <= 0) {
                    // Si oui, on arrête la boucle de jeu et on affiche le menu de départ
                    cancelAnimationFrame(requestId);
                    canvas.style.display = "none";
                    startMenu.style.display = "flex";
                    resetGameVariables(gameVariables);
                }
            }
            // Pour chaque projectile
            gameVariables.projectiles.forEach((projectile, projectileIndex) => {
                // On vérifie si le projectile est en collision avec l'ennemi
                const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
                if (distance - enemy.radius - projectile.radius < 1) {
                    // Si oui, on retire les points de vie de l'ennemi
                    enemy.health -= gameVariables.character.attack;
                    gameVariables.projectiles.splice(projectileIndex, 1);
                    enemy.color = "red";
                    setTimeout(() => {
                        enemy.color = "green"
                    }, 100);
                    // Si les points de vie de l'ennemi sont inférieurs ou égaux à 0 on le supprime
                    if (enemy.health <= 0) {
                        const type = Math.random() > 0.5 ? "health" : "ammo";
                        gameVariables.enemies.splice(index, 1);
                        gameVariables.playerLevel.currentXp += enemy.radius;
                        gameVariables.loots.push(new Loot(enemy.x, enemy.y, 10, type, 10));
                        if (gameVariables.playerLevel.currentXp >= gameVariables.playerLevel.cap) {
                            gameVariables.playerLevel.currentXp = 0;
                            gameVariables.playerLevel.cap *= 1.5;
                            gameVariables.playerLevel.currentLevel += 1;
                            gameVariables.playerHealth.maxHealth += 5;
                            gameVariables.character.attack += 1;
                            gameVariables.character.armor += 1;
                        }
                    }
                }
            });
        });
    } catch (e) {
        cancelAnimationFrame(requestId);
    }
}


