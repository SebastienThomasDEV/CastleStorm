import Entity from "./Entity";

export default class Prop extends Entity {

    constructor(
        x: number,
        y: number,
        radius: number,
        context: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement) {
        super(x, y, radius, context, canvas);
    }

    draw() {
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.fillRect(this.x, this.y, this.radius, this.radius);
    }
}