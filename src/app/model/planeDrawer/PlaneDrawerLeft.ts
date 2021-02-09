import { DirectionEnum } from "src/app/constants/DirectionEnum";
import BoardCell from "../BoardCell";
import Coordinate from "../Coordinate";
import IPlaneDrawer from "./IPlaneDrawer";

export default class PlaneDrawerLeft implements IPlaneDrawer {

    boardSideSize: number;
    key: DirectionEnum = DirectionEnum.LEFT;


    constructor(boardSideSize: number = 10){
        this.boardSideSize = boardSideSize;
    }

    drawHead(planeCenter: Coordinate): Coordinate[] {
        let c = new Coordinate();
        c.x = planeCenter.x-1;
        c.y = planeCenter.y;
        return c.x >= 0 ? [c] : [];
    }
    drawWings(planeCenter: Coordinate): Coordinate[] {
        let wings = [];

        for (let i = 0; i < 5; i++) {
            let c = new Coordinate();
            c.x = planeCenter.x;
            c.y = planeCenter.y+i-2;
            if(c.y >= 0 && c.y < this.boardSideSize)wings.push(c);
        }
        return wings;
    }
    drawBody(planeCenter: Coordinate): Coordinate[] {
        let b = new Coordinate();
        b.x = planeCenter.x+1;
        b.y = planeCenter.y;
        return b.x < this.boardSideSize ? [b] : [];
    }
    drawTail(planeCenter: Coordinate): Coordinate[] {
        let tail = [];
        if(planeCenter.x < this.boardSideSize-2){
            for (let i = 0; i < 3; i++) {
                let c = new Coordinate();
                c.x = planeCenter.x+2;
                c.y = planeCenter.y+i-1;
                if(c.y >= 0 && c.y < this.boardSideSize) tail.push(c)  
            }
        }
        return tail;
    }

}