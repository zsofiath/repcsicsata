import { BoardCellStateEnum } from "../constants/BoardCellStatesEnum";

export default class BoardCell {
    state: BoardCellStateEnum;
    x: number;
    y: number;

    constructor(x:number = null, y:number = null) {
        this.x = x;
        this.y = y;
    }
}