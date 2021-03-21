import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { by, element } from 'protractor';
import { BehaviorSubject, throwError } from 'rxjs';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';
import OutOfBoardError from 'src/app/exceptions/OutOfBoardError';
import BoardCell from 'src/app/model/BoardCell';
import Coordinate from 'src/app/model/Coordinate';
import Plane from 'src/app/model/Plane';
import FakePlaneDrawer from 'src/app/model/planeDrawer/FakePlaneDrawer';
import PlanePart from 'src/app/model/PlanePart';
import { ClearPlanesComponent } from '../preparation/clear-planes/clear-planes.component';
import { GameboardCellComponent } from '../gameboard-cell/gameboard-cell.component';
import { PlaneRotationButtonsComponent } from '../preparation/plane-rotation-buttons/plane-rotation-buttons.component';
import { SavePlacedPlanesComponent } from '../preparation/save-placed-planes/save-placed-planes.component';

import { GameboardComponent } from './gameboard.component';
import FakePlane from 'src/testMocks/MockPlane';

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameboardComponent,
        GameboardCellComponent,
        PlaneRotationButtonsComponent,
        ClearPlanesComponent,
        SavePlacedPlanesComponent
      ],
      imports: [HttpClientTestingModule]

    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(GameboardComponent);
      component = fixture.componentInstance;
      component.elements = [];
      component.$elements = new BehaviorSubject([]);
      el = fixture.debugElement;
    });
  }));

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

  it('should update planes when $elements change',() => {
    component.$elements.next([new FakePlane()]);
    fixture.detectChanges();

    expect(component.elements.length).toEqual(1);
  });

  it('should not place plane on the top op an other plane', () => {
    component.activeElement = new FakePlane();
    component.activeElement.position = {x:0, y:0};

    let placedPlane = new FakePlane();
    placedPlane.position = {x:0, y:0};
    component.elements = [placedPlane]
    
    expect(function(){
      component.onClick();
    }).toThrow(new Error('Bad position'));
  });

  it('should use board cell', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-gameboard-cell')).not.toBe(null);
  }));

  it('should pass the placed planes to the SavePlacedPlanes - nem tudom hogy teszteljem', () => {

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const element = compiled.querySelector('app-save-placed-planes');
    
  });

  it('should show plane by cells on hover', () => {
    let cells = [];
    for (let i = 0; i < 2; i++) {
      let c1 = new BoardCell();
      c1.state = BoardCellStateEnum.FREE;
      c1.x = 0;
      c1.y = i;
      c1.planePart = new PlanePart();      
      let c2 = new BoardCell();
      c2.state = BoardCellStateEnum.FREE;
      c2.x = 1;
      c2.y = i;
      c2.planePart = new PlanePart();      
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

    component.activeElement = plane;
    component.drawPlaneOnCells(coordinate);

    expect(cells[0][0].state).toEqual(BoardCellStateEnum.HIGHLIGHTED);
    expect(cells[0][0].planePart.direction).toEqual(DirectionEnum.LEFT);
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

    component.activeElement = plane;
    component.drawPlaneOnCells(coordinate);

    let coordinate2 = new Coordinate();
    coordinate2.x = 1;
    coordinate2.y = 0; 

    component.activeElement = plane;
    component.drawPlaneOnCells(coordinate2);

    expect(cells[0][0].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[0][0].planePart).toBeFalsy();
    expect(cells[0][1].state).toEqual(BoardCellStateEnum.HIGHLIGHTED);
    expect(cells[1][0].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[1][1].state).toEqual(BoardCellStateEnum.FREE);
  });

  it('should reserve a cell', () => {
    let plane = new FakePlane();
    plane.position = {x:0, y:0};

    let cells = [];
    for (let i = 0; i < 2; i++) {
      let c1 = new BoardCell();
      c1.state = BoardCellStateEnum.FREE;
      c1.x = 0;
      c1.y = i;
      c1.planePart = new PlanePart();      
      let c2 = new BoardCell();
      c2.state = BoardCellStateEnum.FREE;
      c2.x = 1;
      c2.y = i;  
      c2.planePart = new PlanePart();      
      cells.push([c1, c2]);
    }
    

    component.cells = cells;
    component.$elements.next([plane]);

    fixture.detectChanges();

    expect(cells[0][0].state).toBe(BoardCellStateEnum.RESERVED);
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

    component.activeElement = plane;
    component.drawPlaneOnCells(coordinate);

    expect(cells[0][0].state).toEqual(BoardCellStateEnum.HIGHLIGHTED);
    expect(cells[0][1].state).toEqual(BoardCellStateEnum.RESERVED);
    expect(cells[1][0].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[1][1].state).toEqual(BoardCellStateEnum.RESERVED);
  });

  it('it should not overwrite the reserved cell when hover happens', () => {
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

    component.activeElement = plane;
    component.drawPlaneOnCells({x:1, y:0});
    expect(cells[0][1].state).toEqual(BoardCellStateEnum.RESERVED);
  });

  it('it should show error when plane is drow on an already placed plane', () => {
    let cells = [];
    for (let i = 0; i < 2; i++) {
      let c1 = new BoardCell();
      c1.state = BoardCellStateEnum.RESERVED;
      c1.x = 0;
      c1.y = i;
      c1.planePart = new PlanePart();      
      let c2 = new BoardCell();
      c2.state = BoardCellStateEnum.FREE;
      c2.x = 1;
      c2.y = i;  
      c2.planePart = new PlanePart();      
      cells.push([c1, c2]);
    }

    component.cells = cells;
    component.activeElement = new FakePlane();
    let placedPlane = new FakePlane();
    placedPlane.position = {x: 0, y: 0};
    component.elements = [placedPlane];

    let p1 = new PlanePart();
    p1.x = 0;
    p1.y = 0;
    let p2 = new PlanePart();
    p2.x = 1;
    p2.y = 0;
    spyOn(component.activeElement, 'getCoordinates').and.returnValue([p1, p2])
    component.drawPlaneOnCells({x: 0, y: 0});

    expect(cells[0][0].state).toEqual(BoardCellStateEnum.RESERVED);
    expect(cells[0][1].state).toEqual(BoardCellStateEnum.ERROR);
    expect(cells[1][0].state).toEqual(BoardCellStateEnum.RESERVED);
    expect(cells[1][1].state).toEqual(BoardCellStateEnum.FREE);

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

    component.activeElement = plane;
    component.drawPlaneOnCells({x:1, y:0});

    expect(cells[0][0].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[0][1].state).toEqual(BoardCellStateEnum.ERROR);
    expect(cells[1][0].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[1][1].state).toEqual(BoardCellStateEnum.FREE);
  });

  it('should reset cells, when plane array turns empty', fakeAsync(() => {
    let cells = [];
    for (let i = 0; i < 2; i++) {
      let c1 = new BoardCell();
      c1.state = BoardCellStateEnum.RESERVED;
      c1.x = 0;
      c1.y = i;
      c1.planePart = new PlanePart();      
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
    component.$elements = new BehaviorSubject([new Plane(null, null)]);

    component.$elements.next([]);
    
    fixture.detectChanges();
    flush();

    component.cells.forEach(c=> {
      expect(c[0].state).toEqual(BoardCellStateEnum.FREE);
      expect(c[0].planePart).toBeFalsy();
      expect(c[1].state).toEqual(BoardCellStateEnum.FREE);
      expect(c[1].planePart).toBeFalsy();
    })

  }));

  it('should run hover method on hover', fakeAsync(() => {

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
    let fakeDrawer1 = new FakePlaneDrawer();
    plane.drawer = fakeDrawer1;
    component.activeElement = plane;

    component.onCellHover.subscribe((param)=>{
      expect(param.activeElement).toEqual(plane);
      expect(param.cells.length).toBe(2);
      expect(param.cells[0].length).toBe(2);
      expect(param.coordinate).toEqual({x:1, y: 1});
    })

    component.onHover({x:1, y: 1});

    flush();
  }));

  it('should run click method on click', fakeAsync(() => {

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
    let fakeDrawer1 = new FakePlaneDrawer();
    plane.drawer = fakeDrawer1;
    component.activeElement = plane;

    spyOn(component.onCellClick, 'emit');

    component.onClick();
    expect(component.onCellClick.emit).toHaveBeenCalled();

    flush();
  }));
});
