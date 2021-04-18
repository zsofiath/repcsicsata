import { DirectionEnum } from "../constants/DirectionEnum";
import { PlanePartsEnum } from "../constants/PlanePartsEnum";

export default interface IGameBoardElementPart {
    x: number;
    y: number;
    direction: DirectionEnum;
    part: PlanePartsEnum;
    isDamaged: boolean;
}