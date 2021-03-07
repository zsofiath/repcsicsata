import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Plane from 'src/app/model/Plane';
import { PreparationService } from 'src/app/services/preparation.service';

@Component({
  selector: 'app-save-placed-planes',
  templateUrl: './save-placed-planes.component.html',
  styleUrls: ['./save-placed-planes.component.css']
})
export class SavePlacedPlanesComponent implements OnInit {
  @Input() $planes: BehaviorSubject<Plane[]>;
  planes: Plane[];

  loading = false;
  
  
  constructor(public preparationService: PreparationService) { }

  ngOnInit() {

    this.$planes.subscribe(
      planes => {this.planes = planes}
    );
  }

  sendPlanes(){
    this.loading = true;
    this.preparationService.sendPlanes(this.planes).subscribe(
      ()=>{
        
      }
    );
  }

  getUnplacedPlanesNumber() : number {    
    return 4-this.planes.length;
  }

}
