import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';
import { PlanePartsEnum } from 'src/app/constants/PlanePartsEnum';
import BoardCell from 'src/app/model/BoardCell';
import Coordinate from 'src/app/model/Coordinate';

@Component({
  selector: 'app-gameboard-cell',
  templateUrl: './gameboard-cell.component.html',
  styleUrls: [
    './gameboard-cell.component.css',
    './cell-state.css']
})
export class GameboardCellComponent implements OnInit {

  @Input() properties: BoardCell;
  @Output() hoverEvent = new EventEmitter<Coordinate>();
  @Output() clickEvent = new EventEmitter<Coordinate>();

  errorAndReserved = false;

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

  isUp(): Boolean {
    if(!this.properties) return false;
    return this.properties.planePart ? this.properties.planePart.direction == DirectionEnum.UP : false;
  }

  isDown(): Boolean {
    if(!this.properties) return false;
    return this.properties.planePart ? this.properties.planePart.direction == DirectionEnum.DOWN : false;
  }

  isLeft(): Boolean {
    if(!this.properties) return false;
    return this.properties.planePart ? this.properties.planePart.direction == DirectionEnum.LEFT : false;
  }

  isRight(): Boolean {
    if(!this.properties) return false;
    return this.properties.planePart ? this.properties.planePart.direction == DirectionEnum.RIGHT : false;
  }

  isHead(): Boolean {
    if(!this.properties) return false;
    return this.properties.planePart ? this.properties.planePart.part == PlanePartsEnum.HEAD : false;
  }

  isBody(): Boolean {
    if(!this.properties) return false;
    return this.properties.planePart ? this.properties.planePart.part == PlanePartsEnum.BODY : false;
  }

  isWing(i): Boolean {
    if(!this.properties) return false;
    return this.properties.planePart ? this.properties.planePart.part == PlanePartsEnum['WING'+i] : false;
  }

  isTail(i): Boolean {
    if(!this.properties) return false;
    return this.properties.planePart ? this.properties.planePart.part == PlanePartsEnum['TAIL'+i] : false;
  }

  isTargetCross(){
    if(!this.properties) return false;
    return this.properties.planePart ? this.properties.planePart.part == PlanePartsEnum.TARGET_CROSS : false;
  }

  isHit(){
    if(!this.properties) return false;
    return this.properties.planePart ? this.properties.planePart.part == PlanePartsEnum.HIT : false;
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
