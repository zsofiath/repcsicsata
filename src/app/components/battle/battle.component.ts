import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import IGameBoardElement from 'src/app/model/IGameBoardElement';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  hitPlanes: BehaviorSubject<IGameBoardElement[]>;
  targetCross: IGameBoardElement;
  constructor() { 
    this.hitPlanes = new BehaviorSubject([]);
    
  }

  ngOnInit() {
  }

}
