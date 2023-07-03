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

    update(context, lastFrame) {
        this.draw(context);
        const currentFrame = Date.now();
        const deltaTime = (currentFrame - lastFrame) / 1000;
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = this.speed * deltaTime;

        if (distance <= maxDistance) {
            this.x = this.targetX;
            this.y = this.targetY;
        } else {
            const ratio = maxDistance / distance;
            this.x += dx * ratio;
            this.y += dy * ratio;
        }
        return currentFrame;
    }

    // update(lastFrame) {
    //     const currentFrame = Date.now();
    //     const deltaTime = (currentFrame - lastFrame) / 1000;
    //     const dx = this.targetX - this.x;
    //     const dy = this.targetY - this.y;
    //     const distance = Math.sqrt(dx * dx + dy * dy);
    //     const maxDistance = this.speed * deltaTime;
    //
    //     if (distance <= maxDistance) {
    //         this.x = this.targetX;
    //         this.y = this.targetY;
    //     } else {
    //         const ratio = maxDistance / distance;
    //         this.x += dx * ratio;
    //         this.y += dy * ratio;
    //     }
    //
    //      return currentFrame;
    // }


}
