

import Runtime from "./Runtime";
import State from "./State";

export class Game {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    state: State;

    constructor() {
        this.canvas = document.getElementById('game_window') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d')!;
        this.state = new State();
        this.start = this.start.bind(this);
    }

    public start(): void {
        const runtime = new Runtime(60, this.context, this.canvas, this.state);
        runtime.animate();
    }



}
