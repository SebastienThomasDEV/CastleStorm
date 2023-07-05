import Character from "./Entities/Character.js";
import Enemy from "./Entities/Enemy.js";
import {loadImages} from "./Loader.js";
import {shoot} from "./Physics/shoot.js";
import {clearCanvas} from "./Map/CanvaMethods.js";
import {move} from "./Physics/movement.js";
import {debounce} from "./Utils/Utils.js";
import {checkCollision} from "./Physics/collision.js";


const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const projectiles = [];
const enemies = [];
const faceUp = new Image();
const faceRight = new Image();
const faceLeft = new Image();
const faceDown = new Image();
faceUp.src = "./img/faceup.png";
faceRight.src = "./img/faceright.png";
faceLeft.src = "./img/faceleft.png";
faceDown.src = "./img/facedown.png";
const faceDirections = {
    up: faceUp,
    right: faceRight,
    left: faceLeft,
    down: faceDown
}
let keyPresses = {};
window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}

const character = new Character(canvas.width / 2, canvas.height / 2, 10, "blue",  faceDirections.down);

document.addEventListener("click", (e) => shoot(e, character, projectiles));
// document.addEventListener("keydown", (e) => move(e, character, faceDirections));
// document.addEventListener("keyup", (e) => move(e, character, faceDirections));


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
        enemies.push(new Enemy(x, y, radius, "green", velocity));
    }, 2000);
}




function animate() {
    requestAnimationFrame(animate);
    clearCanvas(context, canvas);
    character.draw(context, character.faceDirection, 2);
    character.update(context);
    move(character, faceDirections, keyPresses);
    projectiles.forEach((projectile) => {
        projectile.update(context);
    });
    enemies.forEach((enemy, index) => {
        enemy.update(context);
        projectiles.forEach((projectile, projectileIndex) => {
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if (distance - enemy.radius - projectile.radius < 1) {
                enemies.splice(index, 1);
                projectiles.splice(projectileIndex, 1);
            }
        });
    });
}

loadImages(faceDirections, animate)
spawnEnemies();

