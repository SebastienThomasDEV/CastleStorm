
export default class Entity {

    public x: number;
    public y: number;
    // v for velocity
    public v: {
        x: number,
        y: number
    }
    // t for target
    public t: {
        x: number,
        y: number
    }
    public radius: number;
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    constructor(x: number, y: number, radius: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.x = x;
        this.y = y;
        this.v = {
            x: 0,
            y: 0
        }

        this.t = {
            x: 0,
            y: 0
        }
        this.radius = radius;
        this.context = context;
        this.canvas = canvas;
    }

    public draw(): void {
        throw new Error("Method not implemented.");
    }

    public update(): void {
        throw new Error("Method not implemented.");
    }

}