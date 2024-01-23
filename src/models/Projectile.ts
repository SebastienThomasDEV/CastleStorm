import Entity from "./Entity";
import State from "../vendor/State";

export class Projectile extends Entity {
    launchAngle: number = 0;
    isLaunch: boolean = false;
    velocity = {
        x: 0,
        y: 0
    }

    constructor(x: number, y: number, radius: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        super(x, y, radius, context, canvas, state);
    }

    public isOutOfBounds(): boolean {
        return this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height;
    }

}