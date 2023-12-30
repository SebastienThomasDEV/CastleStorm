
import State from "../../vendor/State";
import Player from "../../models/Player";
import {Slash} from "../projectiles/Slash";

export default class Warrior extends Player {
    private isAttacking: boolean = false;
    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        super(x, y, context, canvas,  state);
    }

    public draw(): void {
        // this.context.fillStyle = 'rgb(255, 0, 0)';
        // this.context.fillRect(this.x, this.y, this.radius, this.radius);
        // // draw outlined circle for the player
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.strokeStyle = 'rgba(0, 0, 0, 1)';
        this.context.stroke();
        this.context.closePath();
    }

    hookMouseDown() {
        // draw a arc
        this.isAttacking = true;
        this.state.addEntity(new Slash(this.y, this.y, this.context, this.canvas, this.state));
        super.hookMouseDown();
    }


}