export class SpriteSheet {
    private matrix: number[][] = [];
    private rows: number = 0;
    private cols: number = 0;
    private frames: number[] = [];
    // public sprite: HTMLImageElement;
    public frameWidth: number;
    public frameHeight: number;

    constructor(frameWidth: number, frameHeight: number, rows: number, cols: number) {
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
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

    public setFrame(frame: any, row: number, col: number): SpriteSheet {
        this.matrix[row][col] = frame;
        this.frames.push(this.frames.length + 1);
        return this;
    }

    public getFrameById(frameId: number): number[] {
        const frame: number[] = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
               if (this.matrix[i][j] === frameId) {
                   frame[0] = i;
                   frame[1] = j;
               }
            }
        }
        return frame;
    }

    public getFramesCount(): number {
        return this.frames.length;
    }

    getFrameHeight(): number {
        return this.frameHeight;
    }

    getFrameWidth(): number {
        return this.frameWidth;
    }

}