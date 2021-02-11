import { DirectionEnum } from "src/app/constants/DirectionEnum";
import BoardCell from "../BoardCell";
import Coordinate from "../Coordinate";
import PlanePart from "../PlanePart";
import IPlaneDrawer from "./IPlaneDrawer";

export default class FakePlaneDrawer implements IPlaneDrawer {

    boardSideSize: number;
    key: DirectionEnum = DirectionEnum.UP;


    constructor(boardSideSize: number = 10){
        this.boardSideSize = boardSideSize;
    }

    drawHead(planeCenter: Coordinate): PlanePart[] {
        let c = new PlanePart();
        c.x = planeCenter.x;
        c.y = planeCenter.y;
        c.direction = DirectionEnum.LEFT;
        return [c];
    }
    drawWings(planeCenter: Coordinate): PlanePart[] {
        return [];
    }
    drawBody(planeCenter: Coordinate): PlanePart[] {
        return [];
    }
    drawTail(planeCenter: Coordinate): PlanePart[] {
        return [];
    }

}