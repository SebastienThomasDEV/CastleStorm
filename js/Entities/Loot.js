
import Entity from "./Entity.js";
export default class Loot extends Entity {
    constructor(x, y, type, radius) {
        super(x, y, radius);
        this.type = type;
    }

    draw(context, game) {
        if (this.type === 'health') {
            // Dessine une potion de vie ayant sa hitbox au centre de l'image
            context.beginPath();
            context.drawImage(game.loots.sprites.potion, 0, 0, 32, 32, this.x - 16, this.y - 16, 32 * 1.2, 32 * 1.2);
            context.closePath();
        } else
            if (this.type === 'money') {
            // Dessine des pièces d'or
            context.beginPath();
            context.drawImage(game.loots.sprites.money.coin, 0, 0, 32, 32, this.x - 16, this.y - 16, 32 * 1.5, 32 * 1.5);
            context.closePath();
        }
    }

    update(context, game) {
        this.draw(context, game);
    }

}