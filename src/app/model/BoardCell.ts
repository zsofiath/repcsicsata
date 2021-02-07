import { BoardCellStateEnum } from "../constants/BoardCellStatesEnum";

export default class BoardCell {
    state: BoardCellStateEnum;
    x: number;
    y: number;
}