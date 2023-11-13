import Ui from "./Ui";


export default class Renderer {
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        if (context === null) {
            throw new Error("Canvas not supported")
        }
        this.context = context!;
        this.canvas = canvas;
    }


    public render(entities: Entity[]): void {
        Ui.draw(this.canvas, this.context);
    }




}