import { Component, OnInit } from '@angular/core';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';
import OutOfBoardError from 'src/app/exceptions/OutOfBoardError';
import GameBoard from 'src/app/model/Board';
import BoardCell from 'src/app/model/BoardCell';
import Coordinate from 'src/app/model/Coordinate';
import Plane from 'src/app/model/Plane';
import PlaneDrawerFactory from 'src/app/model/planeDrawer/PlaneDrawerFactory';
import PlaneDrawerUp from 'src/app/model/planeDrawer/PlaneDrawerUp';

const MAX_PLANES_NUM = 4;


@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  planes: Plane[];
  cells: BoardCell[][];
  allPlanePlaced: Boolean;
  currentPlane: Plane;

  constructor() {
    this.planes = [];
    this.currentPlane = new Plane(new PlaneDrawerUp(), {x:3, y:2});
    let board = new GameBoard();
    this.cells = board.get();
  } 

  ngOnInit() {
  }

  placePlane(){
    if(this.currentPlane.isOverlappingOtherPlane(this.planes)) throw new Error('Bad position');
    
    let plane = this.currentPlane.deepCopy();
    this.putPlaneToRowAndSetCells(plane);

    if(this.planes.length == 4) this.allPlanePlaced = true;  
  }

  private putPlaneToRowAndSetCells(plane: Plane){
    this.planes.push(plane);
    
    plane.getCoordinates().forEach(coord => {   
      this.cells[coord.y][coord.x].state = BoardCellStateEnum.RESERVED;
      this.cells[coord.y][coord.x].planePart = coord;
    });  
  }

  rotation(direction: DirectionEnum){
    this.rotatePlane(direction);
  }

  onHover(coord: Coordinate){
    this.drawPlaneOnCells(this.currentPlane, coord);
  }

  drawPlaneOnCells(plane: Plane, coord: Coordinate) {
    plane.position = coord;
    this.resetHighlightedCells();
    
    try {
      if(plane.isOverlappingOtherPlane(this.planes)) this.setErrorCells(plane);
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

  private setErrorCells(plane: Plane){
    plane.getCoordinates().forEach(c => {            
      this.cells[c.y][c.x].setErrored();
    });
  }

  private setHighlightedCells(plane: Plane){    
    plane.getCoordinates().forEach(c => {            
      this.cells[c.y][c.x].setHighlighted();
    });
  }

  private resetHighlightedCells(){
    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.setFree();
      });
    });
  }

  rotatePlane(direction: DirectionEnum){
    let factory = new PlaneDrawerFactory(direction);
    this.currentPlane = new Plane(factory.get(), {x:1, y:1});
  }

}
