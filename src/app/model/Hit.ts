import { DirectionEnum } from "../constants/DirectionEnum";
import { PlanePartsEnum } from "../constants/PlanePartsEnum";
import IGameBoardElementPart from "./IGameBoardElementPart";

export default class Hit implements IGameBoardElementPart {
    isDamaged = false;
    x: number;
    y: number;
    direction = DirectionEnum.UP;
    part = PlanePartsEnum.HIT;
}