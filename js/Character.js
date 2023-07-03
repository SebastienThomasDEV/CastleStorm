export default class Character {
    constructor(x , y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = 80;
        this.color = color;
        this.targetX = this.x;
        this.targetY = this.y;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fillStyle = this.color;
        context.fill();
    }

    update(context) {
        this.draw(context);
        this.x = this.x + this.velocity.x;
    }




}
