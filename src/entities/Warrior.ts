import Entity from "../model/Entity";
import State from "../vendor/State";

export default class Warrior extends Entity {
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    state: State;

    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        super(x, y, 10);
        this.x = x;
        this.y = y;
        this.context = context;
        this.canvas = canvas;
        this.state = state;
        this.draw = this.draw.bind(this);
    }
}