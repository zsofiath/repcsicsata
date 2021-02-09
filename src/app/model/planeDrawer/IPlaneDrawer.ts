import { DirectionEnum } from "src/app/constants/DirectionEnum";
import Coordinate from "../Coordinate";

export default interface IPlaneDrawer {
    boardSideSize: number;
    key: DirectionEnum;
    drawHead(planeCenter: Coordinate): Coordinate[]
    drawWings(planeCenter: Coordinate): Coordinate[]
    drawBody(planeCenter: Coordinate): Coordinate[]
    drawTail(planeCenter: Coordinate): Coordinate[]
}