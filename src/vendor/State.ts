import Entity from "../models/Entity";


export default class State {
    entities: Entity[] = [];
    score: number = 0;
    level: number = 0;

    constructor() {}

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

    levelUp(): void {
        this.level++;
    }

    addScore(score: number): void {
        this.score += score;
    }

    getScore(): number {
        return this.score;
    }

    getLevel(): number {
        return this.level;
    }



}