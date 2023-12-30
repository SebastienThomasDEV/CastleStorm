import {Projectile} from "../../models/Projectile";
import State from "../../vendor/State";

export class Slash extends Projectile {
    isAttacking: boolean = false;
    angle: number = 0;
    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        super(x, y, 10, context, canvas, state);
        this.velocity = {
            x: 0,
            y: 0
        }
        this.initialize();
    }

    public initialize(): void {

    }

    public draw(): void {
        // draw a line
        this.context.save();
        this.context.beginPath();
        this.context.moveTo(this.x, this.y);
        this.context.lineTo(this.x + 50, this.y + 50);
        this.context.strokeStyle = "red";
        this.context.stroke();
        this.context.restore();


    }

    public update(): void {
        this.draw();
        this.velocity.x = Math.cos(this.angle) * 20;
        this.velocity.y = Math.sin(this.angle) * 20;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

}