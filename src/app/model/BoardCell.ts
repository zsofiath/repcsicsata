import { BoardCellStateEnum } from "../constants/BoardCellStatesEnum";

export default class BoardCell {
    state: BoardCellStateEnum;
    x: number;
    y: number;

    isError = false;

    constructor(x:number = null, y:number = null) {
        this.x = x;
        this.y = y;
    }

    setHighlighted(){
       if(this.state != BoardCellStateEnum.RESERVED) this.state = BoardCellStateEnum.HIGHLIGHTED;
       this.isError = false;
    }

    setFree(){
        if(this.state != BoardCellStateEnum.RESERVED) this.state = BoardCellStateEnum.FREE;
        this.isError = false;
    }

    setErrored(){
        if(this.state != BoardCellStateEnum.RESERVED) this.state = BoardCellStateEnum.ERROR;
        this.isError = true;
    }
}