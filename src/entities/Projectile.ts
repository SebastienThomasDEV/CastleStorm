import Entity from "../models/Entity";

export class Projectile extends Entity {
    private speed: number = 3;

    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, private vlc: { x: number, y: number }) {
        super(x, y, 10, context, canvas);
        this.v = {
            x: this.vlc.x,
            y: this.vlc.y
        }
    }

    public draw(): void {

    }

    public update(): void {
        this.draw();
        this.x += this.v.x + this.speed;
        this.y += this.v.y + this.speed;
    }
}