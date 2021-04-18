import { DirectionEnum } from "../constants/DirectionEnum";
import { PlanePartsEnum } from "../constants/PlanePartsEnum";
import IGameBoardElementPart from "./IGameBoardElementPart";

export default class TargetCrossPart implements IGameBoardElementPart {
    x: number;
    y: number;
    direction = DirectionEnum.UP;
    part = PlanePartsEnum.HIT;
}