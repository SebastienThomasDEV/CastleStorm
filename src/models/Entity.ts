import State from "../vendor/State";

export default class Entity {

    public x: number;
    public y: number;
    public sprite: HTMLImageElement = new Image();
    public state: State;
    public angle: number;
    public scale: number;
    // v for velocity
    public velocity: {
        x: number,
        y: number
    }
    // t for target
    public target: {
        x: number,
        y: number
    }
    public radius: number;
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    constructor(x: number, y: number, radius: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.radius = radius;
        this.context = context;
        this.canvas = canvas;
        this.state = state;
        this.scale = 1;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.target = {
            x: this.x,
            y: this.y
        }
    }

    public draw(): void {
        throw new Error("Method not implemented.");
    }

    public update(): void {
        throw new Error("Method not implemented.");
    }

}