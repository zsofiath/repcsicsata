import { DirectionEnum } from "src/app/constants/DirectionEnum";
import { PlanePartsEnum } from "src/app/constants/PlanePartsEnum";
import BoardCell from "../BoardCell";
import Coordinate from "../Coordinate";
import PlanePart from "../PlanePart";
import IPlaneDrawer from "./IPlaneDrawer";

export default class PlaneDrawerDown implements IPlaneDrawer {

    boardSideSize: number;
    key: DirectionEnum = DirectionEnum.DOWN;


    constructor(boardSideSize: number = 10){
        this.boardSideSize = boardSideSize;
    }

    drawHead(planeCenter: Coordinate): PlanePart[] {
        let c = new PlanePart();
        c.x = planeCenter.x;
        c.y = planeCenter.y+1;
        c.direction = this.key;
        c.part = PlanePartsEnum.HEAD;
        return c.y < this.boardSideSize ? [c] : [];
    }

    drawWings(planeCenter: Coordinate): PlanePart[] {
        let wings = [];

        for (let i = 0; i < 5; i++) {
            let c = new PlanePart();
            c.x = planeCenter.x+i-2;
            c.y = planeCenter.y;
            c.direction = this.key;
            c.part = PlanePartsEnum['WING'+(i+1)];
            if(c.x >= 0 && c.x < this.boardSideSize) wings.push(c);
        }
        return wings;
    }

    drawBody(planeCenter: Coordinate): PlanePart[] {
        let c = new PlanePart();
        c.x = planeCenter.x;
        c.y = planeCenter.y-1;
        c.direction = this.key;
        c.part = PlanePartsEnum.BODY;
        return c.y >= 0 ? [c] : [];
    }

    drawTail(planeCenter: Coordinate): PlanePart[] {
        let tail = [];

        if(planeCenter.y > 1){
            for (let i = 0; i < 3; i++) {
                let c = new PlanePart();
                c.x = planeCenter.x+i-1;
                c.y = planeCenter.y-2;
                c.direction = this.key;
                c.part = PlanePartsEnum['TAIL'+(i+1)];
                if(c.x >= 0 && c.x < this.boardSideSize) tail.push(c)  
            }
        }

        return tail;
    }

}