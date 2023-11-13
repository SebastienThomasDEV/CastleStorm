import Entity from "../models/Entity";
import GameState from "../vendor/GameState";

export default class Warrior extends Entity {
    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: GameState) {
        super(x, y, 10, context, canvas, state);
    }

    public draw(): void {
        this.context.fillStyle = 'rgb(255, 0, 0)';
        this.context.fillRect(this.x, this.y, this.radius, this.radius);
    }
}