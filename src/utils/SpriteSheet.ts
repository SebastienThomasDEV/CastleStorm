export class SpriteSheet {
    private matrix: number[][] = [];
    rows: number = 0;
    cols: number = 0;
    private frames: number[] = [];
    public sprite: HTMLImageElement;
    public frameWidth: number;
    public frameHeight: number;

    constructor(frameWidth: number, frameHeight: number, rows: number, cols: number, sprite: HTMLImageElement) {
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.sprite = sprite;
        this.rows = rows;
        this.cols = cols;
        this.create(rows, cols);
    }

    public create(rows: number, cols:number ): number[][] {
        const matrix: number[][] = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = 0;
            }
        }
        this.matrix = matrix;
        this.rows = rows;
        this.cols = cols;
        return matrix;
    }

    public setFrame(id: any, row: number, col: number): SpriteSheet {
        this.matrix[row - 1][col - 1] = id;
        this.frames.push(this.frames.length + 1);
        return this;
    }

    public getFramesCount(): number {
        return this.frames.length;
    }

    public drawFrame(id: number, context: CanvasRenderingContext2D): void {
        let row: number = 0;
        let col: number = 0;
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] === id + 1) {
                    row = i;
                    col = j;
                }
            }

        }
        context.drawImage(this.sprite, col * this.frameWidth, row * this.frameHeight, this.frameWidth, this.frameHeight, -16, -16, this.frameWidth * 2, this.frameHeight * 2);
    }

}