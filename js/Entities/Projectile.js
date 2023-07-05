export default class Projectile {
    constructor(x, y, velocity, radius, color, image) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.image = image;
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, -this.image.width/2, -this.image.height/2);
    }

    update(context) {
        this.draw(context);
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }



}