import Entity from "./Entity.js";

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
        this.isShooting = false;    // L'ennemi tire-t-il ?
        this.fireRate = 1000;       // Toutes les combien de temps l'ennemi tire-t-il ?
        this.attack = 10;           // Dégâts de l'ennemi
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
            case 'melee':
                this.updateAngle(game);
                this.updateSpeed();
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                // Si l'ennemi est trop proche du joueur, il recule
                // Cette condition est nécessaire pour éviter que l'ennemi ne se colle au joueur
                if (distance < this.radius + game.character.object.radius - 3) {
                    this.x -= this.velocity.x;
                    this.y -= this.velocity.y;
                }
                break;
            case 'ranged':
                this.updateAngle(game);
                this.updateSpeed();
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                if (distance < this.radius + game.character.object.radius + 300) {
                    this.x -= this.velocity.x;
                    this.y -= this.velocity.y;
                }
                break;
        }
    }

    shoot(game, ProjectileClass) {
        const velocity = {
            x: Math.cos(this.angle) * 20,
            y: Math.sin(this.angle) * 20,
        }
        const projectile = new ProjectileClass(this.x , this.y , 5, velocity, 'black');
        this.isShooting = true;
        setTimeout(() => {
            this.isShooting = false;
            }, this.fireRate);
        game.enemyProjectiles.push(projectile);
    }

    updateAngle(game) {
        this.dx = game.character.object.x - this.x;
        this.dy = game.character.object.y - this.y;
        this.angle = Math.atan2(this.dy, this.dx);
    }

    updateSpeed() {
        this.velocity.x = Math.cos(this.angle) * this.speed;
        this.velocity.y = Math.sin(this.angle) * this.speed;
    }

    dropLoot(game, Loot) {
        const type = Math.random() > 0.5 ? "health" : "money";
        game.loots.instances.push(new Loot(this.x, this.y, type, 5));
    }





}
