import { Controller } from "./controller.js";
import { World } from "./world.js";

window.addEventListener("load", () => {
    let size = 50;
    let world = new World(50 ,50, 100);
    let controller = new Controller(world);
});