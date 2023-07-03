export default class Projectile {
    constructor(x, y, velocity, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
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
        this.y = this.y + this.velocity.y;
    }

    // update(canvas, cursor, character) {
    //     if (this.isFired) {
    //         let angle = Math.atan2(cursor.y - character.y, character.x - this.x)
    //         if (cursor.x > this.x) {
    //             this.x += this.speed;
    //             this.y += angle * this.speed;
    //         } else if (cursor.x < this.x) {
    //             this.x -= this.speed;
    //             this.y -= angle * this.speed;
    //         }
    //         if (this.x > canvas.width || this.x === 0) {
    //             this.isFired = false;
    //             this.x = null;
    //             this.y = null;
    //         }
    //     }
    // }



}