import { Pheromone } from "./pheromones.js";
import { Vector2 } from "./util/utils.js";

const WANDER_FORCE = 0.05;

export class Ant {
    private position : Vector2;
    private velocity : Vector2;
    private hasFood : boolean;
    constructor(x: number, y: number) {
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(Math.random(), Math.random()); 
        this.hasFood = false;
    }

    update() : Pheromone | undefined {
        return undefined
    }
}