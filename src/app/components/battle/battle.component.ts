import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Coordinate from 'src/app/model/Coordinate';
import IGameBoardElement from 'src/app/model/IGameBoardElement';
import TargetCrossDrawer from 'src/app/model/planeDrawer/TargetCrossDrawer';
import TargetCross from 'src/app/model/TargetCross';

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
    let drawer = new TargetCrossDrawer();
    let startPosition = new Coordinate();
    startPosition.x =  1;
    startPosition.y = 1;
    this.targetCross = new TargetCross(drawer, startPosition);
  }

  ngOnInit() {
  }

}
