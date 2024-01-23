
import State from "../../vendor/State";
import Player from "../../models/Player";
import {Slash} from "../projectiles/Slash";

export default class Warrior extends Player {

    constructor(x: number, y: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        super(x, y, context, canvas,  state);
    }

    public draw(): void {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.strokeStyle = 'rgba(0, 0, 0, 1)';
        this.context.stroke();
        this.context.closePath();
    }

    hookMouseDown() {
        this.state.addEntity(new Slash(this.x, this.y, this.context, this.canvas, this.state));
        super.hookMouseDown();
    }


}