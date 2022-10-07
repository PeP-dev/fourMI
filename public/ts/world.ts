import { Ant } from "./ant.js";
import { Pheromone } from "./pheromones.js";
import { QuadTree } from "./util/quadtree.js";
import { BoundingBox, Vector2 } from "./util/utils.js";


const HEIGHT = 800;
const WIDTH = 1000;
export class World {
    ants : Ant[];
    pheromones: QuadTree<Pheromone>
    constructor(beginX: number, beginY: number, antAmount: number) {
        this.ants = [] 
        this.pheromones = new QuadTree<Pheromone>(new BoundingBox(new Vector2(0, 0), new Vector2(WIDTH, HEIGHT)), 0);
        for(let i = 0; i < antAmount; i++) {
            let ant = new Ant(beginX + 20 * Math.random(), beginY + 20 * Math.random())
            this.ants.push(ant);
        }
    }

    update() {
        
    }

    animate() {

    }
}