import Character from "./Character.js";
import Projectile from "./Projectile.js";
import Enemy from "./Enemy.js";
import {debounce, clearCanvas} from "./Utils.js";


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
let score = 0;
let scoreElement = document.getElementById("score");
const character = new Character(canvas.width / 2, canvas.height / 2, 10, "blue",  faceDirections.down);

document.addEventListener("click", (e) => {
    const angle = Math.atan2(e.clientY - character.y, e.clientX - character.x);
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }
    projectiles.push(new Projectile(character.x, character.y, velocity, 5, "red"));
});
document.addEventListener("keydown", move);
document.addEventListener("keyup", move);


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

function move(e) {
    console.log(e.code);
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


function animate() {
    requestAnimationFrame(animate);
    clearCanvas(context, canvas);
    scoreElement.innerHTML = score.toString();
    character.draw(context, character.faceDirection);
    character.update(context);
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
                score++;
            }
        });
    });
}

let imgLoaded = 0;
const imgToLoad = Object.keys(faceDirections).length;
for (let faceDirection in faceDirections) {
    faceDirections[faceDirection].onload = () => {
        imgLoaded++;
        if (imgLoaded === imgToLoad) {
            animate();
        }
    }
}
spawnEnemies();

