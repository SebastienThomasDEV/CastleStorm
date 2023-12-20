import Renderer from "./Renderer";
import State from "./State";

export class Game {

    requestId: number | null;
    isRunning : boolean;
    fps: number;
    then: number;
    elapsed: number;
    renderer: Renderer;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new Renderer(canvas, new State())
        this.then = 0;
        this.elapsed = 0;
        this.fps = 60;
        this.requestId = 0;
        this.isRunning = false;
        this.canvas = canvas;
        this.autoResize();
    }

    public loop(): void {
        this.requestId = requestAnimationFrame(this.loop.bind(this))
        const now = performance.now();
        const delta = now - this.then
        const frameInterval = 1000 / this.fps;
        if (delta > frameInterval) {
            this.then = now - (delta / frameInterval);
            this.elapsed++
            this.renderer.render()
        }
    }

    public setFps(fps: number) {
        this.fps = fps;
    }

    public getFps() {
        return this.fps;
    }

    private autoResize(): void {
        const resizeObserver = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            this.canvas.width = width;
            this.canvas.height = height;
            this.renderer.render();
        })
        resizeObserver.observe(this.canvas);
    }
}
