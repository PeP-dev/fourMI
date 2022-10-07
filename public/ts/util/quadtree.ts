import { Displayable } from "./displayable.js";
import { BoundingBox, Vector2 } from "./utils.js";


export class PositionedElement<T> {
    element : T;
    position: Vector2;
    constructor(elt: T, position: Vector2) {
        this.element = elt;
        this.position = position;
    }
}

export class QuadTree<T> implements Displayable{
    readonly MAX_ELEMENTS = 4;

    elements: PositionedElement<T>[];
    subs: QuadTree<T>[];
    level: number;
    bounds : BoundingBox;
    constructor(bounds: BoundingBox, level: number) {
        this.elements = [];
        this.level = level;
        this.bounds = bounds;
        this.subs = [];
    }

    display(ctx: CanvasRenderingContext2D): void {
        ctx.strokeRect(this.bounds.tL.x, this.bounds.tL.y, this.bounds.bR.x - this.bounds.tL.x, this.bounds.bR.y - this.bounds.tL.y)
        this.subs.forEach(sub=>sub.display(ctx));
    }

    append(element : T, position: Vector2) : boolean {
        if (!this.bounds.contains(position)) {
            return false;
        }

        if (this.subs.length == 0 && this.elements.length < this.MAX_ELEMENTS ) {
            this.elements.push(new PositionedElement(element, position));
            return true;
        }

        if (this.subs.length == 0) {
            this.split();
        }

        for(let sub of this.subs) {
            if (sub.append(element, position)) {
                return true;
            }
        }
        return false;
    }

    private split() {
        this.subs.push(new QuadTree(this.bounds.upperLeft(), this.level +1));
        this.subs.push(new QuadTree(this.bounds.upperRight(), this.level +1));
        this.subs.push(new QuadTree(this.bounds.bottomLeft(), this.level +1));
        this.subs.push(new QuadTree(this.bounds.bottomRight(), this.level +1));
        for (const sub of this.subs) {
            for (let index = this.elements.length -1; index >= 0 ; index--) {
                if (sub.append(this.elements[index].element, this.elements[index].position)) {
                    this.elements.splice(index, 1);
                }
            }
        }
    }

    queryRange(range : BoundingBox) : PositionedElement<T>[] {
        if (!this.bounds.intersects(range)) {
            return [];
        }

        let elements = [];
        if (this.subs.length != 0) {
            for (const sub of this.subs) {
                elements.push(...sub.queryRange(range));
            }
        } else {
            for (const element of this.elements) {
                if (range.contains(element.position)) {
                    elements.push(element);
                }
            }
        }

        return elements;
    }

    public get_elements() : PositionedElement<T>[] {
        if (this.subs.length != 0) {
            let elements = []
            for (const sub of this.subs) {
                elements.push(...sub.get_elements());
            }
            return elements;
        } else {
            return this.elements;
        }
    }
}