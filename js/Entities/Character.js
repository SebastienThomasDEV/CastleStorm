export default class Character {
    constructor(x , y, radius, color, viewDirection) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = 5;
        this.targetX = this.x;
        this.targetY = this.y;
        this.viewDirection = viewDirection;
        this.scale = 2;
        this.isHit = false;
    }

    draw(context, faceDirection) {
        if (faceDirection) {
            this.faceDirection = faceDirection;
        }
        context.drawImage(
            this.faceDirection,
            this.x - (this.viewDirection.width * this.scale / 2),
            this.y - (this.viewDirection.width * this.scale / 2),
            this.viewDirection.width * this.scale,
            this.viewDirection.height * this.scale);
    }

    update(context, faceDirection) {
        this.draw(context, this.viewDirection);
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
