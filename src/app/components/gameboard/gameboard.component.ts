import { Component, OnInit } from '@angular/core';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';
import BoardCell from 'src/app/model/BoardCell';
import Coordinate from 'src/app/model/Coordinate';
import Plane from 'src/app/model/Plane';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  planes: Plane[];
  cells: BoardCell[][];

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
    let placedPlane = new Plane;
    placedPlane.direction = direction;
    placedPlane.position = coordinate;

    if(this.planes.length > 0) this.checkIfOverlapsAnyOtherPlane(placedPlane);
    this.cells[coordinate.y.toString()][coordinate.x].state = BoardCellStateEnum.RESERVED;

    this.planes.push(placedPlane);
  }

  private checkIfOverlapsAnyOtherPlane(placedPlane: Plane){
      let i = 0;
      while(this.notOverlappingTheIthPlane(placedPlane, i)) {
        i++;
      }

      if(i < this.planes.length) throw new Error('Bad position');
  }

  private notOverlappingTheIthPlane(placedPlane: Plane, i){
    return !(this.planes[i].position.x == placedPlane.position.x || this.planes[i].position.y == placedPlane.position.y)
  }

}
