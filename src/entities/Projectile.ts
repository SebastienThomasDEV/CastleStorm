import Entity from "../models/Entity";
import State from "../vendor/State";

export class Projectile extends Entity {

    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement , state: State, private speed: { x: number, y: number }) {
        super(x, y, 10, context, canvas, state);
        this.velocity = {
            x: this.speed.x,
            y: this.speed.y
        }

        this.angle = Math.atan2(this.velocity.y, this.velocity.x);
        this.initialize();
    }

    public initialize(): void {
        this.loadSprite();
    }

    public draw(): void {

        const sx = 32;
        const sy = 16
        const sw = 16;
        const sh = 16;
        const dx = -8;
        const dy = -8;
        const dh = 16;
        const dw = 16;
        // image de flèche
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate(this.angle);
        this.context.drawImage(this.sprite, sx, sy, sw, sh, dx, dy, dw, dh);
        // rotation de la flèche
        this.context.beginPath();
        this.context.restore();
    }

    public update(): void {
        this.angle = Math.atan2(this.velocity.y, this.velocity.x);
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if (this.isOutOfBounds()) {
            this.state.removeEntity(this);
        }

    }

    private isOutOfBounds(): boolean {
        return this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height;
    }

    private loadSprite(): void {
        this.sprite.src = "./src/sprites/bow.png";
    }
}