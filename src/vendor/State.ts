import Entity from "../models/Entity";


export default class State {
    entities: Entity[] = [];
    mouse: {
        x: number,
        y: number
    }

    playerPos: {
        x: number,
        y: number
    };

    constructor() {
        this.mouse = {
            x: 0,
            y: 0
        }
        this.playerPos = {
            x: 0,
            y: 0
        }
        this.mouseEvent();
    }


    public addEntity(entity: Entity): void {
        this.entities.push(entity);
    }

    public removeEntity(entity: Entity): void {
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i] === entity) {
                this.entities.splice(i, 1);
            }
        }
    }

    public clear(): void {
        this.entities = [];
    }

    mouseEvent(): void {
        document.addEventListener('mousemove', (e) => {
            this.mouse = {
                x: e.pageX,
                y: e.pageY
            }
        });
    }



}