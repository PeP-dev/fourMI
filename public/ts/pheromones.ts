import { Displayable } from "./util/displayable.js";

export enum PheromoneType {
    FOOD,
    HOME
}

export const MAX_LIFESPAN = 255;

export class Pheromone{
    type: PheromoneType;
    lifespan: number;
    constructor(type: PheromoneType, lifespan: number) {
        this.type = type;
        this.lifespan = lifespan;
    }

    decay(decay: number) : boolean {
        this.lifespan -= decay;
        return this.lifespan <= 0;
    }
}