

import Renderer from "./Renderer";
// import State from "./State";

export class Game {

    requestId: number | null;
    isRunning : boolean;
    fps: number;
    then: number;
    elapsed: number;
    renderer: Renderer;

    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new Renderer(canvas)
        this.then = 0;
        this.elapsed = 0;
        this.fps = 1
        this.requestId = 0
        this.isRunning = false;
    }

    public loop(): void {
        this.requestId = requestAnimationFrame(this.loop.bind(this))
        const now = performance.now();
        const delta = now - this.then
        const frameInterval = 1000 / this.fps;
        if (delta > frameInterval) {
            this.then = now - (delta / frameInterval);
            this.elapsed++
            console.log(this.elapsed)
            this.renderer.render()
        }
    }

    public setFps(fps: number) {
        this.fps = fps;
    }

    public getFps() {
        return this.fps;
    }


}
