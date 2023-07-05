export default class Character {
    constructor(x , y, radius, color, faceDirection) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = 80;
        this.color = color;
        this.targetX = this.x;
        this.targetY = this.y;
        this.faceDirection = faceDirection;
    }

    draw(context, faceDirection, scale) {
        if (faceDirection) {
            this.faceDirection = faceDirection;
        }
        context.drawImage(this.faceDirection, this.x, this.y, this.faceDirection.width * scale, this.faceDirection.height * scale);

    }

    update(context) {
        this.draw(context);
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        if (dx !== 0 || dy !== 0) {
            const angle = Math.atan2(dy, dx);
            const velocity = {
                x: Math.cos(angle) * this.speed,
                y: Math.sin(angle) * this.speed
            }
            if (Math.abs(dx) < Math.abs(velocity.x)) {
                this.x = this.targetX;
            } else {
                this.x += velocity.x;
            }
            if (Math.abs(dy) < Math.abs(velocity.y)) {
                this.y = this.targetY;
            } else {
                this.y += velocity.y;
            }
        }



    }




}
