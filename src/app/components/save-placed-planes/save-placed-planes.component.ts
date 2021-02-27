import { Component, Input, OnInit } from '@angular/core';
import Plane from 'src/app/model/Plane';

@Component({
  selector: 'app-save-placed-planes',
  templateUrl: './save-placed-planes.component.html',
  styleUrls: ['./save-placed-planes.component.css']
})
export class SavePlacedPlanesComponent implements OnInit {
  @Input() planes: Plane[];

  constructor() { }

  ngOnInit() {
  }

}
