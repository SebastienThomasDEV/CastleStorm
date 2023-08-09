
import Entity from "./Entity.js";
export default class Projectile extends Entity {
    constructor(x, y, radius, velocity, color) {
        super(x, y, radius);
        this.velocity = velocity;
        this.color = color;
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
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }



}