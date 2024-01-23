import {Projectile} from "../../models/Projectile";
import State from "../../vendor/State";

export class Slash extends Projectile {
    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        super(x, y, 10, context, canvas, state);
        this.angle = Math.atan2(this.state.mouse.y - this.state.player.y, this.state.mouse.x - this.state.player.x);
    }

    public draw(): void {
        this.context.fillStyle = 'rgb(0, 0, 255)';
        this.context.beginPath();
        // draw a shape with 4 lines connected by moveTo and lineTo
        this.context.moveTo(this.x, this.y);
        this.context.lineTo(this.x + 10, this.y + 10);
        this.context.lineTo(this.x + 10, this.y - 10);
        this.context.lineTo(this.x, this.y);
        this.context.fill();

    }

    public update(): void {
        this.velocity.x = Math.cos(this.angle) * 20;
        this.velocity.y = Math.sin(this.angle) * 20;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if (this.isOutOfBounds()) {
            this.state.removeEntity(this);
        }
        this.draw();
    }

}