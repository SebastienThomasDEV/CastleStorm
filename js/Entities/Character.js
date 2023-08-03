export default class Character {
    constructor(x , y, radius, color, faceDirection) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = 5;
        this.targetX = this.x;
        this.targetY = this.y;
        this.faceDirection = faceDirection;
        this.health = 3;
        this.scale = 2;
        this.isHit = false;
    }

    draw(context, faceDirection, heart_full, heart_empty) {
        if (faceDirection) {
            this.faceDirection = faceDirection;
        }
        switch (this.health) {
            case 3:
                context.drawImage(heart_full, 10, 10, 30, 30);
                context.drawImage(heart_full, 50, 10, 30, 30);
                context.drawImage(heart_full, 90, 10, 30, 30);
                break;
            case 2:
                context.drawImage(heart_full, 10, 10, 30, 30);
                context.drawImage(heart_full, 50, 10, 30, 30);
                context.drawImage(heart_empty, 90, 10, 30, 30);
                break;
            case 1:
                context.drawImage(heart_full, 10, 10, 30, 30);
                context.drawImage(heart_empty, 50, 10, 30, 30);
                context.drawImage(heart_empty, 90, 10, 30, 30);
                break;
        }
        context.drawImage(this.faceDirection, this.x, this.y, this.faceDirection.width * this.scale, this.faceDirection.height * this.scale);

    }

    update(context, heart_full, heart_empty) {
        this.draw(context, this.faceDirection, heart_full, heart_empty );
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
