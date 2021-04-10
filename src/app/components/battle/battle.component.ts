import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { PlanePartsEnum } from 'src/app/constants/PlanePartsEnum';
import BoardCell from 'src/app/model/BoardCell';
import Coordinate from 'src/app/model/Coordinate';
import IGameBoardElement from 'src/app/model/IGameBoardElement';
import TargetCrossDrawer from 'src/app/model/planeDrawer/TargetCrossDrawer';
import PlanePart from 'src/app/model/PlanePart';
import TargetCross from 'src/app/model/TargetCross';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  hitPlanes: BehaviorSubject<IGameBoardElement[]>;
  targetCross: IGameBoardElement;
  confirmationWindowVisible = false;
  ownPlanes$: BehaviorSubject<IGameBoardElement[]>;
  isWaitingForEnemyToShoot = true;

  constructor(public battleService: BattleService) { 
    this.hitPlanes = new BehaviorSubject([]);
    this.ownPlanes$ = new BehaviorSubject([]);
    let drawer = new TargetCrossDrawer();
    let startPosition = new Coordinate();
    startPosition.x =  1;
    startPosition.y = 1;
    this.targetCross = new TargetCross(drawer, startPosition);
  }

  ngOnInit() {
    this.battleService.isStartingPlayer().subscribe(starterPlayer => {
      this.isWaitingForEnemyToShoot = !starterPlayer;
    });

    this.battleService.getOwnPlanes().subscribe(planes => {
      this.ownPlanes$.next(planes);
    });
  }

  onCellHover({activeElement, cells, coordinate}) {
  }

  onCellClick() {
    this.openConfirmationWindow();
  }

  confirmShoot(){
    this.isWaitingForEnemyToShoot = true;
    this.battleService.sendShooting(this.targetCross.position).subscribe(planes => {
      this.hitPlanes.next(planes);
      this.confirmationWindowVisible = false;

      this.battleService.listenForShooting().subscribe(()=>{
        this.isWaitingForEnemyToShoot = false;
      });
    });
  }

  cancekShoot(){
    this.confirmationWindowVisible = false;
  }

  private openConfirmationWindow() {
    this.confirmationWindowVisible = true;
  }
}
