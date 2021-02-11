import { DirectionEnum } from "src/app/constants/DirectionEnum";
import BoardCell from "../BoardCell";
import Coordinate from "../Coordinate";
import PlanePart from "../PlanePart";
import IPlaneDrawer from "./IPlaneDrawer";

export default class PlaneDrawerLeft implements IPlaneDrawer {

    boardSideSize: number;
    key: DirectionEnum = DirectionEnum.LEFT;


    constructor(boardSideSize: number = 10){
        this.boardSideSize = boardSideSize;
    }

    drawHead(planeCenter: Coordinate): PlanePart[] {
        let c = new PlanePart();
        c.x = planeCenter.x-1;
        c.y = planeCenter.y;
        c.direction = this.key;
        return c.x >= 0 ? [c] : [];
    }
    drawWings(planeCenter: Coordinate): PlanePart[] {
        let wings = [];

        for (let i = 0; i < 5; i++) {
            let c = new PlanePart();
            c.x = planeCenter.x;
            c.y = planeCenter.y+i-2;
            c.direction = this.key;
            if(c.y >= 0 && c.y < this.boardSideSize)wings.push(c);
        }
        return wings;
    }
    drawBody(planeCenter: Coordinate): PlanePart[] {
        let c = new PlanePart();
        c.x = planeCenter.x+1;
        c.y = planeCenter.y;
        c.direction = this.key;
        return c.x < this.boardSideSize ? [c] : [];
    }
    drawTail(planeCenter: Coordinate): PlanePart[] {
        let tail = [];
        if(planeCenter.x < this.boardSideSize-2){
            for (let i = 0; i < 3; i++) {
                let c = new PlanePart();
                c.x = planeCenter.x+2;
                c.y = planeCenter.y+i-1;
                c.direction = this.key;
                if(c.y >= 0 && c.y < this.boardSideSize) tail.push(c)  
            }
        }
        return tail;
    }

}