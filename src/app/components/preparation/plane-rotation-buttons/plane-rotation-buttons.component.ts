import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';

@Component({
  selector: 'app-plane-rotation-buttons',
  templateUrl: './plane-rotation-buttons.component.html',
  styleUrls: ['./plane-rotation-buttons.component.css']
})
export class PlaneRotationButtonsComponent implements OnInit {

  @Output() clickEvent = new EventEmitter<DirectionEnum>();
  constructor() { }

  ngOnInit() {
  }

  clickButton(dir: string) {
    this.clickEvent.emit(DirectionEnum[dir]);
  }

}
