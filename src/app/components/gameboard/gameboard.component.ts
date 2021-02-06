import { Component, OnInit } from '@angular/core';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';
import Coordinate from 'src/app/model/Coordinate';
import Plane from 'src/app/model/Plane';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  planes: Plane[] = [];

  constructor() { }

  ngOnInit() {
  }

  placePlane(coordinate: Coordinate, direction: DirectionEnum){
    let placedPlane = new Plane;
    placedPlane.direction = direction;
    placedPlane.position = coordinate;

    if(this.planes.length > 0) this.checkIfOverlapsAnyOtherPlane(placedPlane);
    
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
