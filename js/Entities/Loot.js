export default class Loot {
    constructor(x, y, type, radius) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.radius = radius;
        this.frame = 0;
        this.sprite = 0;
    }

    draw(context, game) {
        if (this.type === 'health') {
            this.sprite = game.loots.sprites.potion;
            // Dessine une potion de vie
            context.beginPath();
            context.drawImage(this.sprite, this.x - 32, this.y - 32, 32, 32);
            context.closePath();
            // dessine le contour de la potion
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context.strokeStyle = 'red';
            context.stroke();
            context.closePath();

        } else
            if (this.type === 'money') {
            // Dessine des pièces d'or
            context.beginPath();
            if (this.frame === 3) {
                context.drawImage(game.loots.sprites.money.bag, 16, this.frame * 16, 16, 16, this.x - 32, this.y - 16, 16 * 2, 16 * 2);
            }
            context.drawImage(game.loots.sprites.money.coin, 0, this.frame * 16, 16, 16, this.x - 32, this.y - 16, 16 * 2, 16 * 2);
        }
    }

    update(context, game) {
        // attendre une seconde avant de changer de frame
        this.frame += 1;
        if (this.frame >= 4) {
            this.frame = 0;
        }
        this.draw(context, game);
    }

}