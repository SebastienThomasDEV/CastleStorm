import Ui from "./Ui";
import Entity from "../models/Entity";
import State from "./State";
import Player from "../entities/Player";


export default class Renderer {
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    state: State;
    entities: Entity[] = [];

    constructor(canvas: HTMLCanvasElement, state: State) {
        const context = canvas.getContext('2d');
        if (context === null) {
            throw new Error("Canvas not supported")
        }
        context.imageSmoothingEnabled = false;
        this.context = context;
        this.canvas = canvas;
        this.state = state;
    }


    public render(): void {
        Ui.draw(this.canvas, this.context);
        let playerInstance = false;
        for (let i = 0; i < this.state.entities.length; i++) {
            if (this.state.entities[i] instanceof Player) {
                playerInstance = true;
            }
            this.state.entities[i].update();
        }

        if (!playerInstance) {
            // spawn player in middle of screen
            this.state.addEntity(new Player(100, 100, this.context, this.canvas, this.state));
        }
    }

}



