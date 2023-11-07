import Entity from "../model/Entity";
import State from "../vendor/State";

export default class Player extends Entity {
    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        super(x, y, 10);
        this.state = state;
        this.draw = this.draw.bind(this);
    }
    public draw(): void {
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.fillRect(this.x, this.y, 10, 10);
    }
}