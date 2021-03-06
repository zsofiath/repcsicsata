import { Component, OnInit } from '@angular/core';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';
import Plane from 'src/app/model/Plane';
import PlaneDrawerFactory from 'src/app/model/planeDrawer/PlaneDrawerFactory';
import PlaneDrawerUp from 'src/app/model/planeDrawer/PlaneDrawerUp';

@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.css']
})
export class PreparationComponent implements OnInit {

  planes: Plane[];
  currentPlane: Plane;


  constructor() {
    this.planes = [];
    this.currentPlane = new Plane(new PlaneDrawerUp(), {x:3, y:2});
   }

  ngOnInit() {
  }

  rotation(direction: DirectionEnum){
    this.rotatePlane(direction);
  }

  rotatePlane(direction: DirectionEnum){
    let factory = new PlaneDrawerFactory(direction);
    this.currentPlane = new Plane(factory.get(), {x:1, y:1});
  }

}
