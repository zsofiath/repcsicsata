import { DirectionEnum } from "src/app/constants/DirectionEnum";
import Coordinate from "../Coordinate";
import PlanePart from "../PlanePart";

export default interface IPlaneDrawer {
    boardSideSize: number;
    key: DirectionEnum;
    drawHead(planeCenter: Coordinate): PlanePart[]
    drawWings(planeCenter: Coordinate): PlanePart[]
    drawBody(planeCenter: Coordinate): PlanePart[]
    drawTail(planeCenter: Coordinate): PlanePart[]
}