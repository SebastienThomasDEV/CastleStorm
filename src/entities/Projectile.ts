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
        this.context.fillStyle = 'rgb(0, 0, 255)';
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();
    }

    public update(): void {
        this.draw();
        this.x += this.v.x + this.speed;
        this.y += this.v.y + this.speed;
    }
}