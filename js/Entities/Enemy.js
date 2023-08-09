import Entity from "./Entity.js";
import Projectile from "./Projectile.js";
export default class Enemy extends Entity {
    constructor(x, y, radius, color, health, velocity, speed, behavior) {
        super(x, y, radius);
        this.color = color; // Couleur de l'ennemi
        this.health = health; // Points de vie de l'ennemi
        this.velocity = velocity;
        this.speed = speed;  // Vitesse de l'ennemi
        this.dx = 0;         // Différence de position entre l'ennemi et le joueur
        this.dy = 0;          // Différence de position entre l'ennemi et le joueur
        this.angle = 0;       // Angle entre l'ennemi et le joueur
        this.behavior = behavior    // Comportement de l'ennemi
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.strokeStyle = "black";
        context.stroke();
        context.closePath();

    }

    update(context, game) {
        this.draw(context);
        const distance = Math.hypot(this.dx, this.dy)
        switch (this.behavior) {
            case 'follow':
                this.updateAngle(game);
                this.updateSpeed();
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                // Si l'ennemi est trop proche du joueur, il recule
                // Cette condition est nécessaire pour éviter que l'ennemi ne se colle au joueur
                if (distance < this.radius + game.character.model.radius - 3) {
                    this.x -= this.velocity.x;
                    this.y -= this.velocity.y;
                }
                break;
            case 'ranged':
                this.updateAngle(game);
                this.updateSpeed();
                setTimeout(() => {
                    this.shoot(game, Projectile);
                }, 1000);
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                if (distance < this.radius + game.character.model.radius + 300) {
                    this.x -= this.velocity.x;
                    this.y -= this.velocity.y;
                }
                break;
        }
    }

    shoot(game, Projectile) {
        const velocity = {
            x: Math.cos(this.angle) * 20,
            y: Math.sin(this.angle) * 20,
        }
        const projectile = new Projectile(this.x , this.y , 5, velocity, 'black');
        game.projectiles.push(projectile);
    }

    updateAngle(game) {
        this.dx = game.character.model.x - this.x;
        this.dy = game.character.model.y - this.y;
        this.angle = Math.atan2(this.dy, this.dx);
    }

    updateSpeed() {
        this.velocity.x = Math.cos(this.angle) * this.speed;
        this.velocity.y = Math.sin(this.angle) * this.speed;
    }



}
