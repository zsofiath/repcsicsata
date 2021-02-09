import BoardCell from "../BoardCell";
import Coordinate from "../Coordinate";
import IPlaneDrawer from "./IPlaneDrawer";

export default class PlaneDrawerUp implements IPlaneDrawer {
    boardSideSize: number;

    constructor(boardSideSize: number = 10){
        this.boardSideSize = boardSideSize;
    }

    drawHead(planeCenter: Coordinate): Coordinate[] {
        let c = new Coordinate();
        c.x = planeCenter.x;
        c.y = planeCenter.y-1;
        return c.y >= 0 ? [c] : [];
    }

    drawWings(planeCenter: Coordinate): Coordinate[] {
        let wings = [];

        for (let i = 0; i < 5; i++) {
            let c = new Coordinate();
            c.x = planeCenter.x+i-2;
            c.y = planeCenter.y;
            if(c.x >= 0 && c.x < this.boardSideSize) wings.push(c);
        }
        return wings;
    }

    drawBody(planeCenter: Coordinate): Coordinate[] {
        let b = new Coordinate();
        b.x = planeCenter.x;
        b.y = planeCenter.y+1;
        return b.y < this.boardSideSize ? [b] : [];
    }

    drawTail(planeCenter: Coordinate): Coordinate[] {
        let tail = [];

        if(planeCenter.y < this.boardSideSize-2){
            for (let i = 0; i < 3; i++) {
                let c = new Coordinate();
                c.x = planeCenter.x+i-1;
                c.y = planeCenter.y+2;
                if(c.x >= 0 && c.x < this.boardSideSize) tail.push(c);  
            }
        }
        

        return tail;
    }

}