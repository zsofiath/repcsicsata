import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Coordinate from '../model/Coordinate';
import DamagedPlane from '../model/DamagedPlane';
import IGameBoardElement from '../model/IGameBoardElement';
import Plane from '../model/Plane';
import PlaneDrawerLeft from '../model/planeDrawer/PlaneDrawerLeft';
import PlaneDrawerPart from '../model/planeDrawer/PlaneDrawerPart';
import PlanePart from '../model/PlanePart';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  

  constructor() { }

  sendShooting(position: Coordinate): Observable<IGameBoardElement[]>{
    return new Observable(obs => {
      obs.next([
        new Plane(new PlaneDrawerLeft(10), {x: 1, y:2}),
        new DamagedPlane(new PlaneDrawerPart(10), {x: 6, y:7})
      ]);
    });
  }

  getOwnPlanes() : Observable<IGameBoardElement[]> {
    return of([
      new Plane(new PlaneDrawerLeft(10), {x: 1, y:2}),
      new Plane(new PlaneDrawerLeft(10), {x: 1, y:7}),
      new Plane(new PlaneDrawerLeft(10), {x: 7, y:2}),
      new Plane(new PlaneDrawerLeft(10), {x: 7, y:7})
    ]);
  }
}
