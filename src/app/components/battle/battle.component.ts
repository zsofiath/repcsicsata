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

  onCellHover(activeElement: IGameBoardElement, cells: BoardCell[][], coordinate: Coordinate) {
    // cellák null-ra állítása
    this.resetHighlightedCells(cells);

    cells[coordinate.y][coordinate.x].state = BoardCellStateEnum.HIGHLIGHTED;
    cells[coordinate.y][coordinate.x].planePart = new PlanePart();
    cells[coordinate.y][coordinate.x].planePart.part = PlanePartsEnum.TARGET_CROSS;
  }

  private resetHighlightedCells(cells: BoardCell[][]){
    cells.forEach(row => {
      row.forEach(cell => {
        cell.setFree();
        if(cell.state != BoardCellStateEnum.RESERVED) cell.planePart = null;
      });
    });
  }
}