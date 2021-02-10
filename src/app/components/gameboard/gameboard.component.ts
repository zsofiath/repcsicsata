import { Component, OnInit } from '@angular/core';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';
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
    this.cells = [];
    this.currentPlane = new Plane(new PlaneDrawerUp(), {x:3, y:2});
    this.makeBoard();
  }

  private makeBoard(){
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

  ngOnInit() {
  }

  placePlane(){
    let placedPlane = this.currentPlane;

    this.checkIfOverlappongAPlacedPlane(placedPlane);   
    let plane = placedPlane.deepCopy();
    this.putPlaneToRow(plane);

    if(this.planes.length == 4) this.allPlanePlaced = true;  
  }

  

  private putPlaneToRow(plane: Plane){
    this.planes.push(plane);

    this.cells[plane.position.y][plane.position.x].state = BoardCellStateEnum.RESERVED;
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
    this.setHighlightedCells(plane);
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

  private checkIfOverlappongAPlacedPlane(placedPlane: Plane){
    let i=0;
    while(i < this.planes.length && this.isNotOverlappingIthPlane(placedPlane, i)){      
      i++;
    }

    if(i< this.planes.length) throw new Error('Bad position');
  }

  private isNotOverlappingIthPlane(placedPlane: Plane, i){    
    return !(this.planes[i].position.x == placedPlane.position.x && 
      this.planes[i].position.y == placedPlane.position.y)
  }



}
