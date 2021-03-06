import { Component, OnInit } from '@angular/core';
import Plane from 'src/app/model/Plane';

@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.css']
})
export class PreparationComponent implements OnInit {

  planes: Plane[];

  constructor() {
    this.planes = [];
   }

  ngOnInit() {
  }

}
