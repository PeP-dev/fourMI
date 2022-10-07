import { MAX_LIFESPAN, PheromoneType } from "../pheromones.js";
import { Displayable } from "../util/displayable.js";
import { Vector2 } from "../util/utils.js"

const PHEROMONE_RADIUS = 3;
export class PheromoneView implements Displayable{
    color: [number, number, number, number];
    position : Vector2;

    constructor(pheromoneType : PheromoneType, lifespan: number, position : Vector2) {
        switch (pheromoneType) {
            case PheromoneType.FOOD :
                this.color = [100, 200, 100, lifespan /  MAX_LIFESPAN]

                break;
            case PheromoneType.HOME :
                this.color = [200, 100, 100, lifespan /  MAX_LIFESPAN]
                break;
            default:
                throw Error("Invalid pheromone type")
        }
        this.position = position;
    }

    display(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath()
        ctx.arc(this.position.x - PHEROMONE_RADIUS, this.position.y - PHEROMONE_RADIUS, PHEROMONE_RADIUS, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.color[3]});`
        ctx.fill()
    }
}