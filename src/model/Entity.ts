import State from "../vendor/State";

export default class Entity {

    public x: number;
    public y: number;
    public dx: number;
    public dy: number;
    public radius: number;
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    state: State;

    constructor(x: number, y: number, radius: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.radius = radius;
        this.context = context;
        this.canvas = canvas;
        this.state = state;
    }

    public draw(): void {
        throw new Error("Method not implemented.");
    }

    public update(): void {
        throw new Error("Method not implemented.");
    }

    public move(): void {
        throw new Error("Method not implemented.");
    }

    public collision(): void {
        throw new Error("Method not implemented.");
    }
}