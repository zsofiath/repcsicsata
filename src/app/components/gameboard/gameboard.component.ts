import { Component, OnInit } from '@angular/core';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';
import BoardCell from 'src/app/model/BoardCell';
import Coordinate from 'src/app/model/Coordinate';
import Plane from 'src/app/model/Plane';

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
        new BoardCell(),
        new BoardCell(),
        new BoardCell(),
        new BoardCell(),
        new BoardCell(),
        new BoardCell(),
        new BoardCell(),
        new BoardCell(),
        new BoardCell(),
        new BoardCell(),
      ]);
    }
  }

  ngOnInit() {
  }

  placePlane(coordinate: Coordinate, direction: DirectionEnum){
    let placedPlane = new Plane(direction, coordinate);

    this.checkIfOverlappongAPlacedPlane(placedPlane);   

    this.planes.push(placedPlane);

    this.cells[placedPlane.position.y][placedPlane.position.x].state = BoardCellStateEnum.RESERVED;

    if(this.planes.length == 4) this.allPlanePlaced = true;  
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
