import Character from "./Entities/Character.js";
import Enemy from "./Entities/Enemy.js";
import {loadImages} from "./Loader.js";
import {shoot} from "./Physics/shoot.js";
import {clearCanvas} from "./Map/CanvaMethods.js";
import {move, dash} from "./Physics/movement.js";
import {keyDownListener, keyUpListener} from "./Utils/Utils.js";


const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight
context.imageSmoothingEnabled = false;
const projectiles = [];
const enemies = [];
let faceUp, faceRight, faceLeft, faceDown;
[faceUp, faceRight, faceLeft, faceDown] = await loadImages([
    "./assets/img/character/faceup.png",
    "./assets/img/character/faceright.png",
    "./assets/img/character/faceleft.png",
    "./assets/img/character/facedown.png",
]);

const faceDirections = {
    up: faceUp,
    right: faceRight,
    left: faceLeft,
    down: faceDown
}
let keyPresses = {};
const character = new Character(canvas.width / 2, canvas.height / 2, 10, "blue", faceDirections.down);
window.addEventListener('keydown', (e) => keyDownListener(e, keyPresses));
window.addEventListener('keyup', (e) => keyUpListener(e, keyPresses));
document.addEventListener("click", (e) => shoot(e, character, projectiles));

function spawnEnemies() {
    setInterval(() => {
        const radius = 10;
        let x;
        let y;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        const angle = Math.atan2(character.y - y, character.x - x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, "green", velocity, 5));
    }, 2000);
}


let requestId = 0;

function animate() {
    try {
        requestId = requestAnimationFrame(animate);
        clearCanvas(context, canvas);
        character.draw(context, character.faceDirection, 2);
        character.update(context);
        move(character, faceDirections, keyPresses);
        dash(character, faceDirections, keyPresses);
        projectiles.forEach((projectile) => {
            projectile.update(context);
        });
        enemies.forEach((enemy, index) => {
            enemy.update(context);
            projectiles.forEach((projectile, projectileIndex) => {
                const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
                if (distance - enemy.radius - projectile.radius < 1) {
                    enemy.health -= projectile.damage;
                    projectiles.splice(projectileIndex, 1);
                    enemy.color = "red";
                    setTimeout(() => {
                        enemy.color = "green"
                    }, 100);
                    if (enemy.health <= 0) {
                        enemies.splice(index, 1);
                    }
                }
            });
        });
    } catch (e) {
        cancelAnimationFrame(requestId);
    }
}

animate();
spawnEnemies();

