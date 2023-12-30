import State from "../../vendor/State";
import {Projectile} from "../../models/Projectile";

export class Arrow extends Projectile {
    isShot: boolean = false;
    aimAngle: number = 0;
    launchAngle: number = 0;

    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        super(x, y, 10, context, canvas, state);
        this.velocity = {
            x: 0,
            y: 0
        }
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
        if (this.isShot) {
            this.context.translate(this.x, this.y);
        } else {
            this.context.translate(this.state.playerPos.x, this.state.playerPos.y);
        }
        if (!this.isShot) {
            this.context.rotate(this.aimAngle);
        } else {
            this.context.rotate(this.angle);
        }
        this.context.drawImage(this.sprite, sx, sy, sw, sh, dx, dy, dw, dh);
        // rotation de la flèche
        this.context.beginPath();
        this.context.restore();
    }

    public update(): void {
        this.aimAngle = Math.atan2(this.state.mouse.y - this.y, this.state.mouse.x - this.x);
        this.angle = Math.atan2(this.velocity.y, this.velocity.x);
        this.draw();
        if (this.isShot) {
            if (this.launchAngle === 0) {
                this.launchAngle = this.aimAngle;
                this.angle = Math.atan2(this.velocity.y, this.velocity.x);
            }
            this.velocity.x = Math.cos(this.launchAngle) * 20;
            this.velocity.y = Math.sin(this.launchAngle) * 20;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        } else {
            this.x = this.state.playerPos.x;
            this.y = this.state.playerPos.y;
        }
        if (this.isOutOfBounds()) {
            console.log("isOutOfBounds");
            this.state.removeEntity(this);
        }

    }

    private isOutOfBounds(): boolean {
        return this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height;
    }

    private loadSprite(): void {
        this.sprite.src = "./src/sprites/bow.png";
    }

    launch(): void {
        this.isShot = true;
    }


}