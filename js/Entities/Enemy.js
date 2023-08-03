export default class Enemy {
    constructor(x, y, radius, color, velocity, health) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.health = health;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    update(context) {
        this.draw(context);
        context.fillText(this.health, this.x, this.y - 10)
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }

}
