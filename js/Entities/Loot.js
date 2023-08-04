export default class Loot {
    constructor(x, y, radius, type) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.type = type;
    }

    draw(context) {
        if (this.type === 'health') {
            // Dessine une trousse de soin
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context.fillStyle = 'red';
            context.fill();
            context.closePath();
        } else if (this.type === 'money') {
            // Dessine des pièces d'or
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context.fillStyle = 'yellow';
            context.fill();
            context.closePath();
        }
    }

    update(context) {
        this.draw(context);
    }

}