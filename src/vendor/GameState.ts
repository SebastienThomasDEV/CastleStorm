import Entity from "../model/Entity";
import Player from "../entities/Player";


export default class GameState {
    enemies: Entity[];
    player: Player | null;
    projectiles: Entity[];
    loots: Entity[];
    score: number;
    level: number;
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.enemies = [];
        this.player = null;
        this.projectiles = [];
        this.loots = [];
        this.score = 0;
        this.level = 1;
        this.context = context;
        this.canvas = canvas;
    }

    public addEnemy(enemy: any): void {
        this.enemies.push(enemy);
    }

    public addPlayer(player: any): void {
        this.player = player;
    }

    public addProjectile(projectile: any): void {
        this.projectiles.push(projectile);
    }

    public addLoot(loot: any): void {
        this.loots.push(loot);
    }

    public removeEnemy(enemy: any): void {
        this.enemies = this.enemies.filter((e: any) => e !== enemy);
    }

    public removePlayer(): void {
        this.player = null;
    }

    public removeProjectile(projectile: any): void {
        this.projectiles = this.projectiles.filter((p: any) => p !== projectile);
    }

    public removeLoot(loot: any): void {
        this.loots = this.loots.filter((l: any) => l !== loot);
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

    getEnemies(): Entity[] {
        return this.enemies;
    }

    getPlayer(): Player | null {
        return this.player;
    }

    getProjectiles(): Entity[] {
        return this.projectiles;
    }

    getLoots(): Entity[] {
        return this.loots;
    }

}