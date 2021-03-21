import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  $planes: BehaviorSubject<Plane[]>;
  planes: Plane[];
  currentPlane: Plane;


  constructor() {
    this.$planes = new BehaviorSubject([]);
    this.planes = [];
    this.currentPlane = new Plane(new PlaneDrawerUp(), {x:3, y:2});
   }

  ngOnInit() {
    this.$planes.subscribe(planes => {this.planes = planes;});
  }

  rotation(direction: DirectionEnum){
    this.rotatePlane(direction);
  }

  rotatePlane(direction: DirectionEnum){
    let factory = new PlaneDrawerFactory(direction);
    this.currentPlane = new Plane(factory.get(), {x:1, y:1});
  }

  onCellHover($event) {
  }

  onCellClick() {
    let plane = this.currentPlane.deepCopy();
    this.putPlaneToRowAndSetCells(plane);
  }

  private putPlaneToRowAndSetCells(plane: Plane) {
    this.planes.push(plane);
    this.$planes.next(this.planes);
  }

}
