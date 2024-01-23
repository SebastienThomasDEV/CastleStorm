import State from "../../vendor/State";
import {Projectile} from "../../models/Projectile";

export class Arrow extends Projectile {
    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        super(x, y, 10, context, canvas, state);
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
        const dx = -16;
        const dy = -16;
        const dh = 32;
        const dw = 32;
        // image de flèche
        this.context.save();
        if (this.isLaunch) {
            this.context.translate(this.x, this.y);
        } else {
            this.context.translate(this.state.player.x, this.state.player.y);
        }
        if (!this.isLaunch) {
            this.context.rotate(this.angle);
        } else {
            this.context.rotate(this.launchAngle);
        }
        this.context.drawImage(this.sprite, sx, sy, sw, sh, dx, dy, dw, dh);
        // rotation de la flèche
        this.context.beginPath();
        this.context.restore();
    }

    public update(): void {
        this.angle = Math.atan2(this.state.mouse.y - this.y, this.state.mouse.x - this.x);
        this.draw();
        if (this.isLaunch) {
            if (this.launchAngle === 0) {
                this.launchAngle = this.angle;
                this.angle = Math.atan2(this.velocity.y, this.velocity.x);
            }
            this.velocity.x = Math.cos(this.launchAngle) * 20;
            this.velocity.y = Math.sin(this.launchAngle) * 20;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        } else {
            this.x = this.state.player.x;
            this.y = this.state.player.y;
        }
        if (this.isOutOfBounds()) {
            console.log("isOutOfBounds");
            this.state.removeEntity(this);
        }

    }



    private loadSprite(): void {
        this.sprite.src = "./src/sprites/bow.png";
    }

    launch(): void {
        this.isLaunch = true;
    }


}