
import Entity from "../Entity.js";
export default class Loot extends Entity {
    constructor(x, y, type, radius) {
        super(x, y, radius);
        this.type = type;
    }

    /** @abstract */
    draw(context, game) {
        throw Error("Must be implemented");
    }

    update(context, game) {
        this.draw(context, game);
    }

}