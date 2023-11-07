export default class Ui {


    public static draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
        context.fillStyle = 'rgb(0, 0, 0)';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    public static clear(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }


}