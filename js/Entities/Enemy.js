export default class Enemy {
    constructor(x, y, radius, color, health, velocity, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.health = health;
        this.velocity = velocity;
        this.speed = speed;
        this.dx = 0;
        this.dy = 0;
        this.angle = 0;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    update(context, game) {
        this.draw(context);
        this.updateAngle(game);
        this.updateSpeed();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
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
