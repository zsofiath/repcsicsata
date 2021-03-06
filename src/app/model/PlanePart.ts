import { DirectionEnum } from "../constants/DirectionEnum";
import { PlanePartsEnum } from "../constants/PlanePartsEnum";
import Coordinate from "./Coordinate";
import IGameBoardElementPart from "./IGameBoardElementPart";

export default class PlanePart implements IGameBoardElementPart {
    x: number;
    y: number;
    direction: DirectionEnum;
    part: PlanePartsEnum;
}