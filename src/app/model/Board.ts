import { BoardCellStateEnum } from "../constants/BoardCellStatesEnum";
import BoardCell from "./BoardCell";
import Plane from "./Plane";

export default class GameBoard {

    cells: BoardCell[][];
    planes: Plane[];

    constructor() {
        this.cells = [];
        this.planes = [];
        this.make();
    }

    make(){
      for (let i = 0; i < 10; i++) {
        this.cells.push([
          new BoardCell(0, i),
          new BoardCell(1, i),
          new BoardCell(2, i),
          new BoardCell(3, i),
          new BoardCell(4, i),
          new BoardCell(5, i),
          new BoardCell(6, i),
          new BoardCell(7, i),
          new BoardCell(8, i),
          new BoardCell(9, i),
        ]);
      }
    }

    get(){
      return this.cells;
    }
}