import Entity from "../models/Entity";
import State from "../vendor/State";
import {Projectile} from "./Projectile";


export default class Player extends Entity {
    public isMoving: boolean;
    private weapon: HTMLImageElement = new Image();
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
    };
    private speed: number = 10;


    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        super(x, y, 10, context, canvas, state);
        this.initialize();
        this.isMoving = false;
        this.angle = 0;
    }

    public draw(): void {
        let SCALE = 1;
        const WIDTH = 16;
        const HEIGHT = 16;
        const SCALED_WIDTH = SCALE * WIDTH;
        const SCALED_HEIGHT = SCALE * HEIGHT;
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate(this.angle);
        this.context.drawImage(this.weapon, 0, 0, SCALED_WIDTH, SCALED_HEIGHT, -SCALED_WIDTH / 2, -SCALED_HEIGHT / 2, SCALED_WIDTH, SCALED_HEIGHT);
        this.context.beginPath();




        // draw a crosshair
        this.context.moveTo(-this.radius / 2, 0);
        this.context.lineTo(this.radius / 2, 0);
        this.context.moveTo(0, -this.radius / 2);
        this.context.lineTo(0, this.radius / 2);

        this.context.strokeStyle = 'red';
        this.context.stroke();
        this.context.closePath();
        this.context.restore();

        // // dessin de la ligne de tir du personnage en fonction du curseur (pour le debug) et un arc de cercle pour le curseur
        this.context.beginPath();
        this.context.moveTo(this.x, this.y);
        this.context.lineTo(this.mouse.x, this.mouse.y);
        this.context.strokeStyle = 'red';
        this.context.stroke();
        this.context.closePath();
    }

    private initialize(): void {
        this.keyEvent();
        this.clickEvent();
        this.mouseEvent();
        this.loadSprite();
    }

    private loadSprite(): void {
        this.sprite.src = './src/sprites/player.png';
        this.weapon.src = './src/sprites/bow.png';
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
            this.target.x = this.x;
            this.target.y = this.y;
        });
    }

    public update(): void {
        this.draw();
        this.angle = Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x);
        if (this.angle < 0) {
            this.angle += Math.PI * 2;
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
        for (const key in this.inputs) {
            if (this.inputs[key]) {
                if (key === 'click') {
                    this.state?.addEntity(new Projectile(this.x, this.y, this.context, this.canvas, this.state,
                        {
                        x: Math.cos(this.angle) * 20,
                        y: Math.sin(this.angle) * 20
                    }));
                }
                if (key === 'z') {
                    if (this.target.y > 0) {
                        this.target.y -= this.speed;
                    } else {
                        this.target.y = 0;
                    }
                }
                if (key === 'q') {
                    if (this.target.x > 0) {
                        this.target.x -= this.speed;
                    } else {
                        this.target.x = 0;
                    }
                }
                if (key === 's') {
                    if (this.target.y < this.canvas.height) {
                        this.target.y += this.speed;
                    } else {
                        this.target.y = this.canvas.height;
                    }
                }
                if (key === 'd') {
                    if (this.target.x < this.canvas.width) {
                        this.target.x += this.speed;
                    } else {
                        this.target.x = this.canvas.width;
                    }
                }

            } else {
                this.isMoving = false;
            }
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
                x: e.pageX,
                y: e.pageY
            }
        });
    }

    debounce(func: any, wait: number, immediate: boolean) {
        let timeout: any;
        return function () {
            // @ts-ignore
            const context = this as Function, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
}