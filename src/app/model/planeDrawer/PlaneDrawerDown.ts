import BoardCell from "../BoardCell";
import Coordinate from "../Coordinate";
import IPlaneDrawer from "./IPlaneDrawer";

export default class PlaneDrawerDown implements IPlaneDrawer {

    constructor(){
    }
    drawHead(planeCenter: Coordinate): Coordinate[] {
        let c = new Coordinate();
        c.x = planeCenter.x;
        c.y = planeCenter.y+1;
        return [c];
    }
    drawWings(planeCenter: Coordinate): Coordinate[] {
        let wings = [];

        for (let i = 0; i < 5; i++) {
            let c = new Coordinate();
            c.x = planeCenter.x+i-2;
            c.y = planeCenter.y;
            wings.push(c);
        }
        return wings;
    }
    drawBody(planeCenter: Coordinate): Coordinate[] {
        let b = new Coordinate();
        b.x = planeCenter.x;
        b.y = planeCenter.y-1;
        return [b];
    }
    drawTail(planeCenter: Coordinate): Coordinate[] {
        let tail = [];

        for (let i = 0; i < 3; i++) {
            let c = new Coordinate();
            c.x = planeCenter.x+i-1;
            c.y = planeCenter.y-2;
            tail.push(c)  
        }

        return tail;
    }

}