import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import BoardCell from 'src/app/model/BoardCell';
import Plane from 'src/app/model/Plane';

@Component({
  selector: 'app-clear-planes',
  templateUrl: './clear-planes.component.html',
  styleUrls: ['./clear-planes.component.css']
})
export class ClearPlanesComponent implements OnInit {

  @Input() $planes: BehaviorSubject<Plane[]>;
  constructor() { }

  ngOnInit() {
  }

  clearPlanes(){
    this.$planes.next([]);
  }

}
