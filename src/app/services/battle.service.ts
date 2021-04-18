import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Coordinate from '../model/Coordinate';
import IGameBoardElement from '../model/IGameBoardElement';
import Plane from '../model/Plane';
import PlaneDrawerLeft from '../model/planeDrawer/PlaneDrawerLeft';
import PlaneDrawerPart from '../model/planeDrawer/PlaneDrawerPart';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  

  constructor() { }

  sendShooting(position: Coordinate): Observable<{won: boolean, elements: IGameBoardElement[]}>{
    return new Observable(obs => {
      obs.next({
        won: false,
        elements:[
        new Plane(new PlaneDrawerLeft(10), {x: 1, y:2}),
        new Plane(new PlaneDrawerPart(10), {x: 6, y:7})
      ]});
    });
  }

  getOwnPlanes() : Observable<IGameBoardElement[]> {
    let plane = new Plane(new PlaneDrawerLeft(10), {x: 1, y:7});
    plane.setHeadDamaged();
    return of([
      new Plane(new PlaneDrawerLeft(10), {x: 1, y:2}),
      plane,
      new Plane(new PlaneDrawerLeft(10), {x: 7, y:2}),
      new Plane(new PlaneDrawerLeft(10), {x: 7, y:7})
    ]);
  }

  isStartingPlayer() : Observable<boolean> {
    return of(true);
  }

  listenForShooting(): Observable<any> {
    return new Observable(obsrver => {
      setTimeout(() => {
        obsrver.next();
      }, 5000);
    });
  }
}
