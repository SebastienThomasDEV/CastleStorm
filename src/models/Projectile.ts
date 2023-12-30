import Entity from "./Entity";

export class Projectile extends Entity {
    constructor(x: number, y: number, radius: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: any) {
        super(x, y, radius, context, canvas, state);
    }

    public draw(): void {
        throw new Error("Method not implemented.");
    }

    public update(): void {
        throw new Error("Method not implemented.");
    }
}