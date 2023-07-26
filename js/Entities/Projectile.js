export default class Projectile {
    constructor(x, y, velocity, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.color = color;
        this.damage = 1;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    update(context) {
        this.draw(context);
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }



}