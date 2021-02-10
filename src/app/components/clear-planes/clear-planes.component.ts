import { Component, Input, OnInit } from '@angular/core';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import BoardCell from 'src/app/model/BoardCell';
import Plane from 'src/app/model/Plane';

@Component({
  selector: 'app-clear-planes',
  templateUrl: './clear-planes.component.html',
  styleUrls: ['./clear-planes.component.css']
})
export class ClearPlanesComponent implements OnInit {

  @Input() planes: Plane[];
  @Input() cells: BoardCell[][];
  constructor() { }

  ngOnInit() {
  }

  clearPlanes(){
    
    let numberOfPlanes = this.planes.length;
    for (let i = 0; i < numberOfPlanes; i++) {
      this.planes.pop(); 
    }

    this.cells.forEach(row => {
      row.forEach(cell=>{
        cell.state = BoardCellStateEnum.FREE;
      })
    });
  }

}
