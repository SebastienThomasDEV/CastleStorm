
export default class Ui {
    static bg: string = '#709775';

    public static draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
        this.clear(canvas, context);
        context.fillStyle = this.bg;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    public static clear(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }


}