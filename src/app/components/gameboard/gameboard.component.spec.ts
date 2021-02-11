import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { throwError } from 'rxjs';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';
import OutOfBoardError from 'src/app/exceptions/OutOfBoardError';
import BoardCell from 'src/app/model/BoardCell';
import Coordinate from 'src/app/model/Coordinate';
import Plane from 'src/app/model/Plane';
import FakePlaneDrawer from 'src/app/model/planeDrawer/FakePlaneDrawer';
import PlaneDrawerFactory from 'src/app/model/planeDrawer/PlaneDrawerFactory';
import PlaneDrawerUp from 'src/app/model/planeDrawer/PlaneDrawerUp';
import { ClearPlanesComponent } from '../clear-planes/clear-planes.component';
import { GameboardCellComponent } from '../gameboard-cell/gameboard-cell.component';
import { PlaneRotationButtonsComponent } from '../plane-rotation-buttons/plane-rotation-buttons.component';

import { GameboardComponent } from './gameboard.component';

class FakePlane extends Plane {
  
  constructor() {
    super(new FakePlaneDrawer(), {x:0, y:0});
    this.numberOfWholePlane = 1;   
  }

  deepCopy(){
    let position = new Coordinate();
    position.x = this.position.x;
    position.y = this.position.y;
    let newobj = new FakePlane();
    newobj.position = position;
    newobj.drawer = this.drawer;

    return newobj;
}
}

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameboardComponent, GameboardCellComponent, PlaneRotationButtonsComponent, ClearPlanesComponent]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(GameboardComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a table as gameboard', () => {
    let gameboard = el.queryAll(By.css("#gameboard"));

    fixture.detectChanges();
    
    expect(gameboard).toBeTruthy("Could not find gameboard");
    expect(gameboard.length).toEqual(1, "Could not find gameboard")
  });

  it('should fill the 10*10 board with cells', () => {
    expect(component.cells.length).toBe(10);
    expect(component.cells[0].length).toBe(10);
  });

  it('should place plane', () => {
    let cells = [];
    for (let i = 0; i < 2; i++) {
      let c1 = new BoardCell();
      c1.state = BoardCellStateEnum.FREE;
      c1.x = 0;
      c1.y = i;      
      let c2 = new BoardCell();
      c2.state = BoardCellStateEnum.FREE;
      c2.x = 1;
      c2.y = i;  
      cells.push([
        c1,
        c2,
      ]);
    }

    component.cells = cells;

    let fakeDrawer = new FakePlaneDrawer();
    spyOn(fakeDrawer, 'drawHead').and.returnValue([{x:0, y:0, direction: null, part:null},{x:0, y:1, direction: null, part:null}]);
    component.currentPlane = new FakePlane();
    component.currentPlane.drawer = fakeDrawer;
    component.currentPlane.numberOfWholePlane = 2;
    component.placePlane();

    expect(component.planes[0].position.x).toEqual(0);
    expect(component.planes[0].position.y).toEqual(0);
    expect(component.cells[0][0].state).toBe(BoardCellStateEnum.RESERVED);
    expect(component.cells[1][0].state).toBe(BoardCellStateEnum.RESERVED);
  });

 

  it('should not place plane on the top op an other plane', () => {
    component.currentPlane = new FakePlane();
    component.currentPlane.position = {x:3, y:2};
    component.placePlane();
    
    
    expect(function(){
      component.placePlane();
    }).toThrow(new Error('Bad position'));
  });

  it('should place 2 planes', () => {
    component.currentPlane = new FakePlane();
    component.currentPlane.position = {x:3, y:2};
    component.placePlane();
    component.currentPlane.position = {x:3, y:5};
    component.placePlane();
    
    expect(component.planes[1].position.x).toEqual(3);
    expect(component.planes[1].position.y).toEqual(5);
    expect(component.cells[5][3].state).toBe(BoardCellStateEnum.RESERVED);
  });

  it('should place only 4 planes', () => {
    component.currentPlane = new FakePlane();

    component.currentPlane.position =  {x:3, y:1};
    component.placePlane();
    component.currentPlane.position =  {x:3, y:5};
    component.placePlane();
    component.currentPlane.position =  {x:5, y:4};
    component.placePlane();
    component.currentPlane.position =  {x:8, y:7};
    component.placePlane();
    
    
    expect(component.allPlanePlaced).toBeTruthy();
  });

  it('should use board cell', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-gameboard-cell')).not.toBe(null);
  }));

  it('should use rotation button component', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-plane-rotation-buttons')).not.toBe(null);
  }));

  it('should use clear planes component', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-clear-planes')).not.toBe(null);
  }));

  it('should show plane by cells on hover', () => {
    let cells = [];
    for (let i = 0; i < 2; i++) {
      let c1 = new BoardCell();
      c1.state = BoardCellStateEnum.FREE;
      c1.x = 0;
      c1.y = i;      
      let c2 = new BoardCell();
      c2.state = BoardCellStateEnum.FREE;
      c2.x = 1;
      c2.y = i;  
      cells.push([
        c1,
        c2,
      ]);
    }

    component.cells = cells;

    let coordinate = new Coordinate();
    coordinate.x = 0;
    coordinate.y = 0;

    let plane = new FakePlane();

    component.drawPlaneOnCells(plane, coordinate);

    expect(cells[0][0].state).toEqual(BoardCellStateEnum.HIGHLIGHTED);
    expect(cells[0][1].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[1][0].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[1][1].state).toEqual(BoardCellStateEnum.FREE);
  });

  it('should show only current plane position by cells on hover', () => {
    let cells = [];
    for (let i = 0; i < 2; i++) {
      let c1 = new BoardCell();
      c1.state = BoardCellStateEnum.FREE;
      c1.x = 0;
      c1.y = i;      
      let c2 = new BoardCell();
      c2.state = BoardCellStateEnum.FREE;
      c2.x = 1;
      c2.y = i;  
      cells.push([
        c1,
        c2,
      ]);
    }

    component.cells = cells;

    let coordinate = new Coordinate();
    coordinate.x = 0;
    coordinate.y = 0;

    let plane = new FakePlane();

    component.drawPlaneOnCells(plane, coordinate);

    let coordinate2 = new Coordinate();
    coordinate2.x = 1;
    coordinate2.y = 0; 

    component.drawPlaneOnCells(plane, coordinate2);

    expect(cells[0][0].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[0][1].state).toEqual(BoardCellStateEnum.HIGHLIGHTED);
    expect(cells[1][0].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[1][1].state).toEqual(BoardCellStateEnum.FREE);
  });

  it('should show only current plane position by cells on hover, and show reserved cells', () => {
    let cells = [];
    for (let i = 0; i < 2; i++) {
      let c1 = new BoardCell();
      c1.state = BoardCellStateEnum.FREE;
      c1.x = 0;
      c1.y = i;      
      let c2 = new BoardCell();
      c2.state = BoardCellStateEnum.RESERVED;
      c2.x = 1;
      c2.y = i;  
      cells.push([
        c1,
        c2,
      ]);
    }
    
    component.cells = cells;

    let coordinate = new Coordinate();
    coordinate.x = 0;
    coordinate.y = 0;

    let plane = new FakePlane();

    component.drawPlaneOnCells(plane, coordinate);

    expect(cells[0][0].state).toEqual(BoardCellStateEnum.HIGHLIGHTED);
    expect(cells[0][1].state).toEqual(BoardCellStateEnum.RESERVED);
    expect(cells[1][0].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[1][1].state).toEqual(BoardCellStateEnum.RESERVED);
  });

  it('it should not ovewrite the reserved cell when hover happens', () => {
    let cells = [];
    for (let i = 0; i < 2; i++) {
      let c1 = new BoardCell();
      c1.state = BoardCellStateEnum.FREE;
      c1.x = 0;
      c1.y = i;      
      let c2 = new BoardCell();
      c2.state = BoardCellStateEnum.RESERVED;
      c2.x = 1;
      c2.y = i;  
      cells.push([
        c1,
        c2,
      ]);
    }
    
    component.cells = cells;

    let plane = new FakePlane();

    component.drawPlaneOnCells(plane, {x:1, y:0});
    expect(cells[0][1].state).toEqual(BoardCellStateEnum.RESERVED);
  });

  it('it should show error when plane is drawen on an already placed plane', () => {
    let cells = [];
    for (let i = 0; i < 2; i++) {
      let c1 = new BoardCell();
      c1.state = BoardCellStateEnum.FREE;
      c1.x = 0;
      c1.y = i;      
      let c2 = new BoardCell();
      c2.state = BoardCellStateEnum.FREE;
      c2.x = 1;
      c2.y = i;  
      cells.push([
        c1,
        c2,
      ]);
    }
    
    component.cells = cells;

    let fakeDrawer1 = new FakePlaneDrawer();
    spyOn(fakeDrawer1, 'drawHead').and.returnValue([{x:1, y:0, direction: null, part:null},{x:1, y:1, direction: null, part:null}]);
    let plane = new FakePlane();
    plane.drawer = fakeDrawer1;
    plane.numberOfWholePlane = 2;
    component.currentPlane = plane;
    component.drawPlaneOnCells(plane, {x:1, y:0});
    
    component.placePlane();

    let fakeDrawer2 = new FakePlaneDrawer();
    spyOn(fakeDrawer2, 'drawHead').and.returnValue([{x:0, y:0, direction: null, part:null},{x:1, y:0, direction: null, part:null}]);
    let plane2 = new FakePlane();
    plane2.drawer = fakeDrawer2;
    plane2.numberOfWholePlane = 2;

    component.drawPlaneOnCells(plane2, {x:0, y:0});
    expect(cells[0][0].state).toEqual(BoardCellStateEnum.ERROR);
    expect(cells[0][1].state).toEqual(BoardCellStateEnum.RESERVED);
    expect(cells[1][0].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[1][1].state).toEqual(BoardCellStateEnum.RESERVED);
  });

  it('it should show error (keeping shape) when plane is drawen on an already placed plane', () => {
    let cells = [];
    for (let i = 0; i < 2; i++) {
      let c1 = new BoardCell();
      c1.state = BoardCellStateEnum.FREE;
      c1.x = 0;
      c1.y = i;      
      let c2 = new BoardCell();
      c2.state = BoardCellStateEnum.FREE;
      c2.x = 1;
      c2.y = i;  
      cells.push([
        c1,
        c2,
      ]);
    }
    
    component.cells = cells;

    let fakeDrawer1 = new FakePlaneDrawer();
    spyOn(fakeDrawer1, 'drawHead').and.returnValue([{x:1, y:0, direction: null, part:null},{x:1, y:1, direction: null, part:null}]);
    let plane = new FakePlane();
    plane.drawer = fakeDrawer1;
    component.currentPlane = plane;
    component.drawPlaneOnCells(plane, {x:1, y:0});
    
    component.placePlane();

    let fakeDrawer2 = new FakePlaneDrawer();
    spyOn(fakeDrawer2, 'drawHead').and.returnValue([{x:0, y:0, direction: null, part:null},{x:1, y:0, direction: null, part:null}]);
    let plane2 = new FakePlane();
    plane2.drawer = fakeDrawer2;

    let fakeDrawer3 = new FakePlaneDrawer();
    spyOn(fakeDrawer3, 'drawHead').and.returnValue([{x:0, y:1, direction: null, part:null},{x:1, y:1, direction: null, part:null}]);
    let plane3 = new FakePlane();
    plane3.drawer = fakeDrawer3;

    component.drawPlaneOnCells(plane2, {x:0, y:0});
    component.drawPlaneOnCells(plane3, {x:0, y:1});
    expect(cells[0][0].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[0][1].state).toEqual(BoardCellStateEnum.RESERVED);
    expect(cells[1][0].state).toEqual(BoardCellStateEnum.ERROR);
    expect(cells[1][1].state).toEqual(BoardCellStateEnum.RESERVED);
  });

  it('should be an error if leaving board with any part of the plane', () => {
    let cells = [];
    for (let i = 0; i < 2; i++) {
      let c1 = new BoardCell();
      c1.state = BoardCellStateEnum.FREE;
      c1.x = 0;
      c1.y = i;      
      let c2 = new BoardCell();
      c2.state = BoardCellStateEnum.FREE;
      c2.x = 1;
      c2.y = i;  
      cells.push([
        c1,
        c2,
      ]);
    }
    
    component.cells = cells;
    let plane = new FakePlane();
    spyOn(plane,'getCoordinates').and.callFake(() => {
      throw new OutOfBoardError([{x:1, y:0}]);
    });

    component.drawPlaneOnCells(plane, {x:1, y:0});

    expect(cells[0][0].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[0][1].state).toEqual(BoardCellStateEnum.ERROR);
    expect(cells[1][0].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[1][1].state).toEqual(BoardCellStateEnum.FREE);
  });
});
