import { DirectionEnum } from "src/app/constants/DirectionEnum";
import Coordinate from "../Coordinate";
import PlanePart from "../PlanePart";
import IPlaneDrawer from "./IPlaneDrawer";

export default class TargetCrossDrawer implements IPlaneDrawer {
    boardSideSize: number;
    key: DirectionEnum;
    drawHead(planeCenter: Coordinate): PlanePart[] {        
        let part = new PlanePart();
        part.x = planeCenter.x;
        part.y = planeCenter.y;
        return [part];
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