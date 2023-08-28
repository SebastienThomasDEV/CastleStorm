import Loot from "./Loot.js";

export class Health extends Loot {
	/** @override */
	draw(context, game) {
		// Dessine une potion de vie ayant sa hitbox au centre de l'image
		context.beginPath();
		context.drawImage(game.loots.sprites.potion, 0, 0, 32, 32, this.x - 16, this.y - 16, 32 * 1.2, 32 * 1.2);
		context.closePath();
    }
}

// const health = new Health();
// health.draw();

// health instanceof Loot
// health instanceof Health
// health instanceof Money