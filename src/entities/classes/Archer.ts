import Player from "../../models/Player";
import {Arrow} from "../projectiles/Arrow";
import {SpriteSheet} from "../../utils/SpriteSheet";

export default class Archer extends Player {
    private loaded: boolean = false;
    private ammunitions: number = 10;
    private bullet: Arrow|null = null;
    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: any) {
        super(x, y, context, canvas, state);
    }

    public draw(): void {
        super.draw();

        let spriteSheet = new SpriteSheet(16, 16, 3, 3, this.weapon);
        spriteSheet
            .setFrame(1, 1, 1)
            .setFrame(2, 2, 1)
            .setFrame(3, 1, 2)
            .setFrame(4, 2, 2)
        ;
        if (this.delay > this.limit) {
            if (this.isFiring) {
                this.loaded = false;
                if (this.frame < spriteSheet.getFramesCount() - 1) {
                    this.frame++;
                }
                if (this.frame === spriteSheet.getFramesCount() - 1) {
                    this.loaded = true;
                    this.frame = spriteSheet.getFramesCount() - 1;
                }
            } else {
                this.frame = 0;
            }
            this.delay = 0;
        } else {
            this.delay++;
        }
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate(this.angle);
        spriteSheet.drawFrame(this.frame, this.context);
        this.context.restore();
    }

    hookMouseUp() {
        if (this.isFiring) {
            if (this.loaded) {
                this.ammunitions--;
                this.bullet!.launch();
                this.bullet = null;
                this.loaded = false;
                this.isFiring = false;
                this.frame = 0;
            }
        }
        super.hookMouseUp();
    }

    hookMouseDown() {
        if (!this.isFiring) {
            this.isFiring = true;
            if (!this.bullet) {
                this.bullet = new Arrow(this.x, this.y, this.context, this.canvas, this.state);
                this.state.addEntity(this.bullet);
            }
        }
        super.hookMouseDown();
    }



}