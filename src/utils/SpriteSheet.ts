export class SpriteSheet {
    private matrix: number[][] = [];
    private rows: number = 0;
    private cols: number = 0;
    private frames: number[] = [];
    constructor(
        public sprite: HTMLImageElement,
        public width: number,
        public height: number,
    ) {}

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

    public setFrame(frameId: number, row: number, col: number): void {
        this.matrix[row][col] = frameId;
        this.frames.push(frameId);
        console.log(this.frames);
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

}