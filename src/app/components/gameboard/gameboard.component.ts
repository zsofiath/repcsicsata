import { Component, Input, OnInit } from '@angular/core';
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

  @Input() elements: IGameBoardElement[];
  cells: BoardCell[][];
  allPlanePlaced: Boolean;
  @Input() activeElement: IGameBoardElement;

  constructor() {
    
    let board = new GameBoard();
    this.cells = board.get();
  } 

  ngOnInit() {
  }

  placePlane(){
    if(this.activeElement.isOverlappingOtherPlane(this.elements)) throw new Error('Bad position');
    
    let plane = this.activeElement.deepCopy();
    this.putPlaneToRowAndSetCells(plane);

    if(this.elements.length == 4) this.allPlanePlaced = true;  
  }

  private putPlaneToRowAndSetCells(plane: Plane){
    this.elements.push(plane);
    
    plane.getCoordinates().forEach(coord => {   
      this.cells[coord.y][coord.x].state = BoardCellStateEnum.RESERVED;
      this.cells[coord.y][coord.x].planePart = coord;
    });  
  }

  onHover(coord: Coordinate){
    this.drawPlaneOnCells(this.activeElement, coord);
  }

  drawPlaneOnCells(plane: IGameBoardElement, coord: Coordinate) {
    plane.position = coord;
    this.resetHighlightedCells();
    
    try {
      if(plane.isOverlappingOtherPlane(this.elements)) this.setErrorCells(plane);
      else {
        this.setHighlightedCells(plane);
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
