import { DirectionEnum } from "src/app/constants/DirectionEnum";
import BoardCell from "../BoardCell";
import Coordinate from "../Coordinate";
import IPlaneDrawer from "./IPlaneDrawer";

export default class PlaneDrawerRight implements IPlaneDrawer {

    boardSideSize: number;
    key: DirectionEnum = DirectionEnum.RIGHT;


    constructor(boardSideSize: number = 10){
        this.boardSideSize = boardSideSize;
    }

    drawHead(planeCenter: Coordinate): Coordinate[] {
        let c = new Coordinate();
        c.x = planeCenter.x+1;
        c.y = planeCenter.y;
        return planeCenter.x < this.boardSideSize-1 ? [c] : [];
    }
    drawWings(planeCenter: Coordinate): Coordinate[] {
        let wings = [];

        for (let i = 0; i < 5; i++) {
            let c = new Coordinate();
            c.x = planeCenter.x;
            c.y = planeCenter.y+i-2;
            if(c.y >= 0 && c.y < this.boardSideSize) wings.push(c);
        }
        return wings;
    }
    drawBody(planeCenter: Coordinate): Coordinate[] {
        let b = new Coordinate();
        b.x = planeCenter.x-1;
        b.y = planeCenter.y;
        return b.x >= 0 ?[b] : [];
    }
    drawTail(planeCenter: Coordinate): Coordinate[] {
        let tail = [];
        
        if(planeCenter.x > 1) {
            for (let i = 0; i < 3; i++) {
                let c = new Coordinate();
                c.x = planeCenter.x-2;
                c.y = planeCenter.y+i-1;
                if(c.y >= 0 && c.y < this.boardSideSize) tail.push(c)  
            }
        }

        return tail;
    }

}