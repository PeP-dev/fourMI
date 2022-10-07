import { Pheromone, PheromoneType } from "./pheromones.js";
import { Vector2 } from "./util/utils.js";
import { PheromoneView } from "./view/pheromone_view.js";
import { World } from "./world.js";

export class Controller {

    constructor(world : World) {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;

        canvas.addEventListener('click', (ev) => {
            console.log("clicked")
            console.log(world.pheromones.append(new Pheromone(PheromoneType.HOME, 255), new Vector2(ev.clientX, ev.clientY)));
            let ctx = canvas.getContext("2d")!;
            world.pheromones.display(ctx)
            world.pheromones.get_elements()
                .map(pheromone=> new PheromoneView(pheromone.element.type, pheromone.element.lifespan, pheromone.position))
                .forEach(view=> view.display(ctx))
        });
    }
}