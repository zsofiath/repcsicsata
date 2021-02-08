import { Component, OnInit } from '@angular/core';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';
import BoardCell from 'src/app/model/BoardCell';
import Coordinate from 'src/app/model/Coordinate';
import Plane from 'src/app/model/Plane';
import IPlaneDrawer from 'src/app/model/planeDrawer/IPlaneDrawer';
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

  constructor() {
    this.planes = [];
    this.cells = [];
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

  placePlane(coordinate: Coordinate, direction: DirectionEnum){
    let drawerFactory = new PlaneDrawerFactory(direction);
    let placedPlane = new Plane(drawerFactory.get(), coordinate);

    this.checkIfOverlappongAPlacedPlane(placedPlane);   

    this.planes.push(placedPlane);

    this.cells[placedPlane.position.y][placedPlane.position.x].state = BoardCellStateEnum.RESERVED;

    if(this.planes.length == 4) this.allPlanePlaced = true;  
  }

  onHover(coord: Coordinate){
    let pl = new Plane(new PlaneDrawerUp(), coord);
    console.log(pl);
    
    this.drawPlaneOnCells(pl);
  }

  drawPlaneOnCells(plane: Plane) {
    
    this.cells.forEach(row => {
      row.forEach(cell => {
        if(cell.state != BoardCellStateEnum.RESERVED) cell.state = BoardCellStateEnum.FREE;
      });
    });

    
    plane.getCoordinates().forEach(c => {
      console.log(c.y,c.x);
      
      this.cells[c.y][c.x].state = BoardCellStateEnum.HIGHLIGHTED;
    });
  }

  private checkIfOverlappongAPlacedPlane(placedPlane: Plane){
    let i=0;
    while(i< this.planes.length && this.isNotOverlappingIthPlane(placedPlane, i)){
      i++;
    }

    if(i< this.planes.length) throw new Error('Bad position');
  }

  private isNotOverlappingIthPlane(placedPlane: Plane, i){
    return !(this.planes[i].position.x == placedPlane.position.x && 
      this.planes[i].position.y == placedPlane.position.y)
  }



}
