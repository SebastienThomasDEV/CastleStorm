import Entity from "../models/Entity";
import State from "../vendor/State";
import {Projectile} from "./Projectile";


export default class Player extends Entity {
    public isMoving: boolean;
    private inputs: any = {
        'z': false,
        'q': false,
        's': false,
        'd': false,
        'click': false,
    };
    private mouse: any = {
        x: 0,
        y: 0
    }
    private angle: number;
    private speed: number = 10;


    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, private state?: State) {
        super(x, y, 10, context, canvas);
        this.isMoving = false;
        this.angle = 0;
        if (this.state === undefined) {
            throw new Error("State is undefined");
        }
        this.initialize();
    }

    public draw(): void {
        this.context.fillStyle = 'rgb(0, 255, 0)';
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();
    }

    private initialize(): void {
        this.keyEvent();
        this.clickEvent();
        this.mouseEvent();
    }

    private keyEvent(): void {
        document.body.addEventListener('keydown', (e: KeyboardEvent) => {
            this.inputs[e.key] = true;
        });
        document.body.addEventListener('keyup', (e: KeyboardEvent) => {
            for (let i = 0; i < Object.keys(this.inputs).length; i++) {
                if (Object.keys(this.inputs)[i] === e.key) {
                    this.inputs[e.key] = false;
                }
            }
        });
    }

    public update(): void {
        this.draw();
        const keys = Object.keys(this.inputs);
        const keyDown: string[] = [];
        for (let i = 0; i < keys.length; i++) {
            if (this.inputs[keys[i]]) {
                keyDown.push(keys[i]);
            }
        }
        if (keyDown.length !== 0) {
            for (let i = 0; i < keys.length; i++) {
                if (this.inputs[keys[i]]) {
                    this.isMoving = true;
                    switch (keys[i]) {
                        case 'z':
                            if (this.t.y > 0) {
                                this.t.y -= this.speed;
                            } else {
                                this.t.y = 0;
                            }
                            break;
                        case 'q':
                            if (this.t.x > 0) {
                                this.t.x -= this.speed;
                            } else {
                                this.t.x = 0;
                            }
                            break;
                        case 's':
                            if (this.t.y < this.canvas.height) {
                                this.t.y += this.speed;
                            } else {
                                this.t.y = this.canvas.height;
                            }
                            break;
                        case 'd':
                            if (this.t.x < this.canvas.width) {
                                this.t.x += this.speed;
                            } else {
                                this.t.x = this.canvas.width;
                            }
                            break;
                        case ' ':
                            // dash mechanic

                            break;

                    }
                }
            }
            const dx = this.t.x - this.x;
            const dy = this.t.y - this.y;
            if (dx !== 0 || dy !== 0) {
                const angle = Math.atan2(dy, dx);
                const velocity = {
                    x: Math.cos(angle) * this.speed,
                    y: Math.sin(angle) * this.speed
                }
                if (Math.abs(dx) < Math.abs(velocity.x)) {
                    this.x = this.t.x;
                } else {
                    this.x += velocity.x;
                }
                if (Math.abs(dy) < Math.abs(velocity.y)) {
                    this.y = this.t.y;
                } else {
                    this.y += velocity.y;
                }
            }
        }
        if (this.inputs['click']) {
            this.angle = Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x);
            this.state?.addEntity(new Projectile(this.x, this.y, this.context, this.canvas, {
                x: Math.cos(this.angle) * 20,
                y: Math.sin(this.angle) * 20
            }));
        }
    }

    clickEvent(): void {
        this.canvas.addEventListener('mousedown', () => {
            this.inputs['click'] = true;
        });
        this.canvas.addEventListener('mouseup', () => {
            this.inputs['click'] = false;
        });
    }

    mouseEvent(): void {
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse = {
                x: e.clientX,
                y: e.clientY
            }
        });
    }
}