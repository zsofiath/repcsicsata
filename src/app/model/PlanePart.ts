import { DirectionEnum } from "../constants/DirectionEnum";
import { PlanePartsEnum } from "../constants/PlanePartsEnum";
import Coordinate from "./Coordinate";

export default class PlanePart extends Coordinate {
    direction: DirectionEnum;
    part: PlanePartsEnum;
}