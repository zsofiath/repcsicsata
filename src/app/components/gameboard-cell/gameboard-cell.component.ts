import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import BoardCell from 'src/app/model/BoardCell';
import Coordinate from 'src/app/model/Coordinate';

@Component({
  selector: 'app-gameboard-cell',
  templateUrl: './gameboard-cell.component.html',
  styleUrls: ['./gameboard-cell.component.css']
})
export class GameboardCellComponent implements OnInit {

  @Input() properties: BoardCell;
  @Output() hoverEvent = new EventEmitter<Coordinate>();
  @Output() clickEvent = new EventEmitter<Coordinate>();

  constructor() { }

  ngOnInit() {
  }

  isCellFree(): Boolean {
    return this.properties && this.properties.state == BoardCellStateEnum.FREE;
  }

  isCellHighlighted(): Boolean {
    return this.properties && this.properties.state == BoardCellStateEnum.HIGHLIGHTED;
  }

  isCellError(): Boolean {
    return this.properties && this.properties.state == BoardCellStateEnum.ERROR;
  }

  isCellReserved(): Boolean {
    return this.properties && this.properties.state == BoardCellStateEnum.RESERVED;
  }

  onHover(){
    let coordinate = new Coordinate();
    coordinate.x = this.properties.x;
    coordinate.y = this.properties.y;
    this.hoverEvent.emit(coordinate);
  }

  onClick(){
    let coordinate = new Coordinate();
    coordinate.x = this.properties.x;
    coordinate.y = this.properties.y;
    this.clickEvent.emit(coordinate);
  }

}
