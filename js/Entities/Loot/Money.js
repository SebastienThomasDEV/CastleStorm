import Loot from "./Loot.js";

export class Money extends Loot {
	/** @override */
	draw(context, game) {
		// Dessine des pièces d'or
		context.beginPath();
		context.drawImage(game.loots.sprites.money.coin, 0, 0, 32, 32, this.x - 16, this.y - 16, 32 * 1.5, 32 * 1.5);
        context.closePath();
    }
}