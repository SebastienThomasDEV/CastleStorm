import Entity from "./Entity";

export default class Prop extends Entity {

        constructor(x: number, y: number, radius: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: any) {
            super(x, y, radius, context, canvas, state);
            this.sprite.src = 'assets/prop.png';
        }

        public draw(): void {
            this.context.save();
            this.context.translate(this.x, this.y);
            this.context.rotate(this.angle);
            this.context.scale(this.scale, this.scale);
            this.context.drawImage(this.sprite, this.frame * 16, 0, 16, 16, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
            this.context.restore();
        }

        public update(): void {
            this.draw();
        }
}