import { Component, Input, OnInit } from '@angular/core';
import Plane from 'src/app/model/Plane';
import { PreparationService } from 'src/app/services/preparation.service';

@Component({
  selector: 'app-save-placed-planes',
  templateUrl: './save-placed-planes.component.html',
  styleUrls: ['./save-placed-planes.component.css']
})
export class SavePlacedPlanesComponent implements OnInit {
  @Input() planes: Plane[];

  loading = false;
  
  
  constructor(public preparationService: PreparationService) { }

  ngOnInit() {
  }

  sendPlanes(){
    this.loading = true;
  }

  getUnplacedPlanesNumber() : number {
    console.log(this.planes.length);
    
    return 4-this.planes.length;
  }

}
