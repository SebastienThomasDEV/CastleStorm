export default class Projectile {
    constructor(x, y, velocity, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.color = color;
    }

    draw(context) {
        // On dessine le projectile en forme de flèche d'archer
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + Math.cos(this.velocity.angle) * this.radius, this.y + Math.sin(this.velocity.angle) * this.radius);
        context.lineTo(this.x + Math.cos(this.velocity.angle + Math.PI / 2) * this.radius / 2, this.y + Math.sin(this.velocity.angle + Math.PI / 2) * this.radius / 2);
        context.lineTo(this.x + Math.cos(this.velocity.angle + Math.PI) * this.radius, this.y + Math.sin(this.velocity.angle + Math.PI) * this.radius);
        context.lineTo(this.x + Math.cos(this.velocity.angle - Math.PI / 2) * this.radius / 2, this.y + Math.sin(this.velocity.angle - Math.PI / 2) * this.radius / 2);
        context.lineTo(this.x + Math.cos(this.velocity.angle) * this.radius, this.y + Math.sin(this.velocity.angle) * this.radius);
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