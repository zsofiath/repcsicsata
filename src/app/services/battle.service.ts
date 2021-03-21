import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Coordinate from '../model/Coordinate';
import IGameBoardElement from '../model/IGameBoardElement';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor() { }

  sendShooting(position: Coordinate): Observable<IGameBoardElement[]>{
    return new Observable();
  }
}
