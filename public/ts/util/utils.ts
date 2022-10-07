export class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(vector : Vector2) : Vector2 {
        this.x += vector.x;
        this.y += vector.y;
        return new Vector2(this.x + vector.x, this.y + vector.y)
    }

    copy() : Vector2{
        return new Vector2(this.x, this.y);
    }
}

export class BoundingBox {
    tL: Vector2;
    bR: Vector2;
    constructor(tL: Vector2, bR: Vector2) {
        this.tL = tL;
        this.bR = bR;    
    }

    contains(position : Vector2) : boolean {
        return position.x >= this.tL.x && position.y >= this.tL.y && position.x <= this.bR.x && position.y <= this.bR.y;
    }

    distance(position : Vector2) : number {
        var dx = Math.max(this.tL.x - position.x, 0, position.x - this.bR.x);
        var dy = Math.max(this.tL.y - position.y, 0, position.y - this.bR.y);
        return Math.sqrt(dx*dx + dy*dy);
    }

    intersects(box: BoundingBox) {
        if (this.tL.x == this.bR.x || this.tL.y == this.bR.y || box.bR.x == box.tL.x || box.tL.y == box.bR.y) {
            return false;

        }
         
        if (this.tL.x > box.bR.x || box.tL.x > this.bR.x){
            return false;
        }     
        if (this.bR.y > box.tL.y || box.bR.y > this.tL.y) {
            return false;
        }
     
        return true;
    }

    upperLeft() : BoundingBox {
        return new BoundingBox(
            this.tL.copy(), 
            new Vector2((this.tL.x + this.bR.x) / 2, (this.tL.y + this.bR.y) / 2)
        )
    }

    upperRight() : BoundingBox {
        return new BoundingBox(
            new Vector2((this.tL.x + this.bR.x) / 2, this.tL.y), 
            new Vector2(this.bR.x, (this.tL.y + this.bR.y) / 2)
        )
    }

    bottomLeft() : BoundingBox {
        return new BoundingBox(
            new Vector2(this.tL.x, (this.tL.y + this.bR.y) / 2), 
            new Vector2((this.tL.x + this.bR.x) / 2, this.bR.y)
        )    
        
    }

    bottomRight() : BoundingBox {
        return new BoundingBox(
            new Vector2((this.tL.x + this.bR.x) / 2, (this.tL.y + this.bR.y) / 2), 
            this.bR.copy()
        )
    }
}
