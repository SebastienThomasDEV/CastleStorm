import Ui from "./Ui";
import State from "./State";

export default class Runtime {
    fps: number;
    then: number;
    now: number;
    elapsed: number;
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    state: State;

    constructor(fps: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: State) {
        this.fps = fps;
        this.then = Date.now();
        this.now = Date.now();
        this.elapsed = 0;
        this.context = context;
        this.canvas = canvas;
        this.state = state;
        this.animate = this.animate.bind(this);
    }


    public animate(): void {
        requestAnimationFrame(this.animate);
        this.then = this.then || Date.now();
        this.now = Date.now();
        this.elapsed = this.now - this.then;
        if (this.elapsed > this.fps) {
            this.then = this.now - (this.elapsed % this.fps);
            Ui.draw(this.canvas, this.context);
        }
    }

}