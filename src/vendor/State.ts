import Entity from "../models/Entity";


export default class State {
    entities: Entity[] = [];
    public mouse = {
        x: 0,
        y: 0
    }

    public player = {
        x: 0,
        y: 0,
    }

    constructor() {
        this.mouseMoveEvent();
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

    mouseMoveEvent(): void {
        document.addEventListener('mousemove', (e) => {
            this.mouse = {
                x: e.pageX,
                y: e.pageY
            }
        });
    }




}