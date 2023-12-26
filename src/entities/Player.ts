import Entity from "../models/Entity";
import State from "../vendor/State";

export default class Player extends Entity {
    public isMoving: boolean = false;
    public isFiring: boolean = false;
    public weapon: HTMLImageElement = new Image();
    private inputs: any = {
        'z': false,
        'q': false,
        's': false,
        'd': false,
    };
    delay: number = 0;
    limit: number = 20;
    private speed: number = 10;


    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        super(x, y, 10, context, canvas, state);
        this.initialize();
        this.angle = 0;
    }

    public draw(): void {
        // draw a outline of the player
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.context.fill();
        this.context.closePath();

        // // // dessin de la ligne de tir du personnage en fonction du curseur (pour le debug) et un arc de cercle pour le curseur
        // this.context.beginPath();
        // this.context.moveTo(this.x, this.y);
        // this.context.lineTo(this.mouse.x, this.mouse.y);
        // this.context.strokeStyle = 'red';
        // this.context.stroke();
        // this.context.closePath();
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
        this.state.playerPos.x = this.x;
        this.state.playerPos.y = this.y;
        this.angle = Math.atan2(this.state.mouse.y - this.y, this.state.mouse.x - this.x);
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
                // if (key === 'click') {
                //     this.state?.addEntity(new Projectile(this.x, this.y, this.context, this.canvas, this.state,
                //         {
                //         x: Math.cos(this.angle) * 20,
                //         y: Math.sin(this.angle) * 20
                //     }));
                // }
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