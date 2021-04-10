import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import OutOfBoardError from 'src/app/exceptions/OutOfBoardError';
import GameBoard from 'src/app/model/Board';
import BoardCell from 'src/app/model/BoardCell';
import Coordinate from 'src/app/model/Coordinate';
import IGameBoardElement from 'src/app/model/IGameBoardElement';
import Plane from 'src/app/model/Plane';

const MAX_PLANES_NUM = 4;


@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  @Input() $elements: BehaviorSubject<IGameBoardElement[]>;
  @Input() disabled = false;
  @Output() onCellHover = new EventEmitter();
  @Output() onCellClick = new EventEmitter();
  elements: IGameBoardElement[];
  cells: BoardCell[][];
  allPlanePlaced: Boolean;
  @Input() activeElement: IGameBoardElement;

  constructor() {
    
    let board = new GameBoard();
    this.cells = board.get();
  } 

  ngOnInit() {
    this.$elements.subscribe(e => {     
      this.elements = e;
      if(e.length == 0) {
        this.resetCells();
      }
      else {
        this.drawElements();
      }
    })
  }

  private drawElements() {
    this.elements.forEach(element => {
      this.setPartsReserved(element);
    });
  }

  private setPartsReserved(element: IGameBoardElement) {
    element.getCoordinates().forEach(elementPart => {
      this.cells[elementPart.y][elementPart.x].setReserved();
    });
  }

  private resetCells() {
    this.cells.forEach(row => {
      row.forEach(cell => { 
        cell.state = BoardCellStateEnum.FREE;
        cell.planePart = null;
       });
    });
  }

  onClick(){
    if(!this.disabled) {
      this.checkIfOverlapping();    
      this.onCellClick.emit();
    }
  }

  private checkIfOverlapping() { 
    if (this.activeElement.isOverlappingOtherPlane(this.elements))
      throw new Error('Bad position');
  }

  onHover(coord: Coordinate){
    if(!this.disabled) {
      this.onCellHover.emit({activeElement: this.activeElement, cells: this.cells, coordinate: coord});
      this.drawPlaneOnCells(coord);
    }
  }

  drawPlaneOnCells(coord: Coordinate) {
    this.activeElement.position = coord;    
    this.resetHighlightedCells();
    
    try {
      if(this.activeElement.isOverlappingOtherPlane(this.elements)) this.setErrorCells(this.activeElement);
      else {
        this.setHighlightedCells(this.activeElement);
      }
    } catch (error) {
      let err = error as OutOfBoardError;

      err.coordinates.forEach(c => {            
        this.cells[c.y][c.x].setErrored();
      });
    }
  }

  private setErrorCells(plane: IGameBoardElement){
    plane.getCoordinates().forEach(c => {            
      this.cells[c.y][c.x].setErrored();
      if(this.cells[c.y][c.x].state != BoardCellStateEnum.RESERVED) this.cells[c.y][c.x].planePart = c;
    });
  }

  private setHighlightedCells(plane: IGameBoardElement){    
    plane.getCoordinates().forEach(c => {            
      this.cells[c.y][c.x].setHighlighted();
      this.cells[c.y][c.x].planePart = c;
    });
  }

  private resetHighlightedCells(){
    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.setFree();
        if(cell.state != BoardCellStateEnum.RESERVED) cell.planePart = null;
      });
    });
  }



}
