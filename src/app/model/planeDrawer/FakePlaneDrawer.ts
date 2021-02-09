import { DirectionEnum } from "src/app/constants/DirectionEnum";
import BoardCell from "../BoardCell";
import Coordinate from "../Coordinate";
import IPlaneDrawer from "./IPlaneDrawer";

export default class FakePlaneDrawer implements IPlaneDrawer {

    boardSideSize: number;
    key: DirectionEnum = DirectionEnum.UP;


    constructor(boardSideSize: number = 10){
        this.boardSideSize = boardSideSize;
    }

    drawHead(planeCenter: Coordinate): Coordinate[] {
        let c = new Coordinate();
        c.x = planeCenter.x;
        c.y = planeCenter.y;
        return [c];
    }
    drawWings(planeCenter: Coordinate): Coordinate[] {
        return [];
    }
    drawBody(planeCenter: Coordinate): Coordinate[] {
        return [];
    }
    drawTail(planeCenter: Coordinate): Coordinate[] {
        return [];
    }

}