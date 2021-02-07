import BoardCell from "../BoardCell";
import Coordinate from "../Coordinate";
import IPlaneDrawer from "./IPlaneDrawer";

export default class PlaneDrawerRight implements IPlaneDrawer {

    constructor(){
    }
    drawHead(planeCenter: Coordinate): Coordinate[] {
        let c = new Coordinate();
        c.x = planeCenter.x+1;
        c.y = planeCenter.y;
        return [c];
    }
    drawWings(planeCenter: Coordinate): Coordinate[] {
        let wings = [];

        for (let i = 0; i < 5; i++) {
            let c = new Coordinate();
            c.x = planeCenter.x;
            c.y = planeCenter.y+i-2;
            wings.push(c);
        }
        return wings;
    }
    drawBody(planeCenter: Coordinate): Coordinate[] {
        let b = new Coordinate();
        b.x = planeCenter.x-1;
        b.y = planeCenter.y;
        return [b];
    }
    drawTail(planeCenter: Coordinate): Coordinate[] {
        let tail = [];

        for (let i = 0; i < 3; i++) {
            let c = new Coordinate();
            c.x = planeCenter.x-2;
            c.y = planeCenter.y+i-1;
            tail.push(c)  
        }

        return tail;
    }

}