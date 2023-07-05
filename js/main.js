import Character from "./Entities/Character.js";
import Enemy from "./Entities/Enemy.js";
import { load } from "./Loader.js";
import {shoot} from "./Physics/shoot.js";
import {clearCanvas} from "./Map/CanvaMethods.js";
import {move} from "./Physics/movement.js";
import {keyDownListener, keyUpListener} from "./Utils/Utils.js";


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
const arrowAnimation1 = new Image();
const arrowAnimation2 = new Image();
const arrowAnimation3 = new Image();
const arrowAnimation4 = new Image();
faceUp.src = "./img/character/faceup.png";
faceRight.src = "./img/character/faceright.png";
faceLeft.src = "./img/character/faceleft.png";
faceDown.src = "./img/character/facedown.png";
arrowAnimation1.src = "./img/projectile/arrow1.png";
arrowAnimation2.src = "./img/projectile/arrow2.png";
arrowAnimation3.src = "./img/projectile/arrow3.png";
arrowAnimation4.src = "./img/projectile/arrow4.png";
const arrowAnimations = {
    arrow1 : arrowAnimation1,
    arrow2 : arrowAnimation2,
    arrow3 : arrowAnimation3,
    arrow4 : arrowAnimation4
}


const faceDirections = {
    up: faceUp,
    right: faceRight,
    left: faceLeft,
    down: faceDown
}
let keyPresses = {};
const character = new Character(canvas.width / 2, canvas.height / 2, 10, "blue",  faceDirections.down);
window.addEventListener('keydown', (e)=>keyDownListener(e, keyPresses));
window.addEventListener('keyup', (e)=>keyUpListener(e, keyPresses));


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
load({
    up: faceUp,
    right: faceRight,
    left: faceLeft,
    down: faceDown,
    arrow1 : arrowAnimation1,
    arrow2 : arrowAnimation2,
    arrow3 : arrowAnimation3,
    arrow4 : arrowAnimation4
}, animate)


spawnEnemies();

