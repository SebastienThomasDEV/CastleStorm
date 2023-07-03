import Character from "./Character.js";
import Projectile from "./Projectile.js";
import Enemy from "./Enemy.js";
import {debounce, clearCanvas } from "./Utils.js";


const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const projectiles = [];
const enemies = [];
let score = 0;
let scoreElement = document.getElementById("score");
const character = new Character(canvas.width / 2, canvas.height / 2, 10, 12, "blue");
document.addEventListener("click", (e) => {
    const angle = Math.atan2(e.clientY - character.y, e.clientX - character.x);
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }
    projectiles.push(new Projectile(character.x, character.y, velocity, 5, "red"));
});
document.addEventListener("keydown", debounce(move, 10));
document.addEventListener("keyup", debounce(move, 10));


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
    if (e.code === "KeyA") { // Flèche gauche
        character.targetX -= 10;
    } else if (e.code === "KeyD") { // Flèche droite
        character.targetX += 10;
    } else if (e.code === "KeyW") { // Flèche haut
        character.targetY -= 10;
    } else if (e.code === "KeyS") { // Flèche bas
        character.targetY += 10;
    }
}

let lastFrame = Date.now();
function animate() {
    requestAnimationFrame(animate);
    clearCanvas(context, canvas);
    scoreElement.innerHTML = score.toString();
    character.draw(context);
    lastFrame = character.update(context, lastFrame);
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

animate();
spawnEnemies();

