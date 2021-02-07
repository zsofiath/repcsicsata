import { Component, Input, OnInit } from '@angular/core';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import BoardCell from 'src/app/model/BoardCell';

@Component({
  selector: 'app-gameboard-cell',
  templateUrl: './gameboard-cell.component.html',
  styleUrls: ['./gameboard-cell.component.css']
})
export class GameboardCellComponent implements OnInit {

  @Input() properties: BoardCell;
  cellIsFree;
  constructor() { }

  ngOnInit() {
    this.cellIsFree = true;
  }

  isCellFree(): Boolean{
    return this.properties && this.properties.state == BoardCellStateEnum.FREE;
  }

  isCellHighlighted(): Boolean{
    return this.properties && this.properties.state == BoardCellStateEnum.HIGHLIGHTED;
  }

  isCellError(): Boolean{
    return this.properties && this.properties.state == BoardCellStateEnum.ERROR;
  }

  isCellReserved(): Boolean{
    return this.properties && this.properties.state == BoardCellStateEnum.RESERVED;
  }

}
