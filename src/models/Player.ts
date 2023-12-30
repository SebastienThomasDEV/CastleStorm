import Entity from "./Entity";
import State from "../vendor/State";

export default class Player extends Entity {
    public isMoving: boolean = false;
    public isFiring: boolean = false;
    public weapon: HTMLImageElement = new Image();
    public dashLocation: {
        x: number,
        y: number
    }
    private inputs: any = {
        'z': false,
        'q': false,
        's': false,
        'd': false,
        ' ': false
    };
    delay: number = 0;
    limit: number = 20;
    private speed: number = 10;


    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        super(x, y, 10, context, canvas, state);
        this.initialize();
        this.angle = 0;
        this.dashLocation = {
            x: this.x,
            y: this.y
        }
    }

    public draw(): void {
        // draw outlined circle for the player
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.strokeStyle = 'rgba(0, 0, 0, 1)';
        this.context.stroke();
        this.context.closePath();
        // draw a circle that represent the range of the dash ability which is 7 times the radius of the player
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius * 7, 0, Math.PI * 2);
        this.context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        this.context.stroke();
        this.context.closePath();
        // draw a line from the player to the point that it cross the circle of the dash ability and draw a point at the end of the line
        this.context.beginPath();
        this.context.moveTo(this.x, this.y);
        this.context.lineTo(this.x + Math.cos(this.angle) * this.radius * 7, this.y + Math.sin(this.angle) * this.radius * 7);
        this.context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        this.context.stroke();
        this.context.closePath();
        this.context.beginPath();
        this.context.arc(this.x + Math.cos(this.angle) * this.radius * 7, this.y + Math.sin(this.angle) * this.radius * 7, 5, 0, Math.PI * 2);
        this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.context.fill();
        this.context.closePath();

    }

    private initialize(): void {
        this.loadSprite();
        this.keyEvent();
        this.clickEvent();
    }

    private loadSprite(): void {
        this.sprite.src = './src/sprites/player.png';
        this.weapon.src = './src/sprites/bow.png';
    }

    private keyEvent(): void {
        document.body.addEventListener('keydown', (e: KeyboardEvent) => {
            this.inputs[e.key] = true;
            this.hookKeyDown();
        });
        document.body.addEventListener('keyup', (e: KeyboardEvent) => {
            for (let i = 0; i < Object.keys(this.inputs).length; i++) {
                if (Object.keys(this.inputs)[i] === e.key) {
                    this.inputs[e.key] = false;
                }
            }
            this.target.x = this.x;
            this.target.y = this.y;
            this.hookKeyUp();
        });
    }

    public update(): void {
        this.draw();
        this.state.playerPos.x = this.x;
        this.state.playerPos.y = this.y;
        this.angle = Math.atan2(this.state.mouse.y - this.y, this.state.mouse.x - this.x);
        if (this.angle < 0) {
            this.angle += Math.PI * 2;
        }
        for (const key in this.inputs) {
            if (this.inputs[key]) {
                if (key === 'z') {
                    if (this.target.y > 0) {
                        this.target.y -= this.speed;
                    } else {
                        this.target.y = 0;
                    }
                } else if (key === 'q') {
                    if (this.target.x > 0) {
                        this.target.x -= this.speed;
                    } else {
                        this.target.x = 0;
                    }
                } else if (key === 's') {
                    if (this.target.y < this.canvas.height) {
                        this.target.y += this.speed;
                    } else {
                        this.target.y = this.canvas.height;
                    }
                } else if (key === 'd') {
                    if (this.target.x < this.canvas.width) {
                        this.target.x += this.speed;

                    } else {
                        this.target.x = this.canvas.width;
                    }
                }

                if (key === ' ') {

                }

            } else {
                this.isMoving = false;

            }
        }
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        if (dx !== 0 || dy !== 0) {
            const angle = Math.atan2(dy, dx);
            this.velocity.x = Math.cos(angle) * this.speed;
            this.velocity.y = Math.sin(angle) * this.speed;
            if (Math.abs(dx) < Math.abs(this.velocity.x)) {
                this.x = this.target.x;
            } else {
                this.x += this.velocity.x;
            }
            if (Math.abs(dy) < Math.abs(this.velocity.y)) {
                this.y = this.target.y;
            } else {
                this.y += this.velocity.y;
            }
        }
    }

    clickEvent(): void {
        this.canvas.addEventListener('mousedown', () => {
            this.hookMouseDown();
            this.isFiring = true;
        });
        this.canvas.addEventListener('mouseup', () => {
            this.hookMouseUp();
            this.isFiring = false;
        });
    }

    hookMouseDown(): void {}
    hookMouseUp(): void {}
    hookKeyDown(): void {}
    hookKeyUp(): void {}
    hookUpdate(): void {}
    hookDraw(): void {}


}