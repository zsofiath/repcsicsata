import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';
import BoardCell from 'src/app/model/BoardCell';
import Coordinate from 'src/app/model/Coordinate';
import Plane from 'src/app/model/Plane';
import FakePlaneDrawer from 'src/app/model/planeDrawer/FakePlaneDrawer';
import PlaneDrawerFactory from 'src/app/model/planeDrawer/PlaneDrawerFactory';
import PlaneDrawerUp from 'src/app/model/planeDrawer/PlaneDrawerUp';
import { GameboardCellComponent } from '../gameboard-cell/gameboard-cell.component';
import { PlaneRotationButtonsComponent } from '../plane-rotation-buttons/plane-rotation-buttons.component';

import { GameboardComponent } from './gameboard.component';

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameboardComponent, GameboardCellComponent, PlaneRotationButtonsComponent ]
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
    component.placePlane({x:3, y:2}, DirectionEnum.UP);

    expect(component.planes[0].position.x).toEqual(3);
    expect(component.planes[0].position.y).toEqual(2);
    expect(component.planes[0].drawer instanceof PlaneDrawerUp).toBeTruthy();
    expect(component.cells[2][3].state).toBe(BoardCellStateEnum.RESERVED);
  });

  it('should place 2 planes', () => {
    component.placePlane({x:3, y:2}, DirectionEnum.UP);
    component.placePlane({x:3, y:5}, DirectionEnum.UP);
    
    expect(component.planes[1].position.x).toEqual(3);
    expect(component.planes[1].position.y).toEqual(5);
    expect(component.planes[1].drawer instanceof PlaneDrawerUp).toBeTruthy();
    expect(component.cells[5][3].state).toBe(BoardCellStateEnum.RESERVED);
  });

  it('should not place plane on the top op an other plane', () => {
    component.placePlane({x:3, y:2}, DirectionEnum.UP);
    
    
    expect(function(){
      component.placePlane({x:3, y:2}, DirectionEnum.UP);
    }).toThrow(new Error('Bad position'));
  });

  it('should place only 4 planes', () => {
    component.placePlane({x:3, y:1}, DirectionEnum.UP);
    component.placePlane({x:3, y:5}, DirectionEnum.UP);
    component.placePlane({x:5, y:4}, DirectionEnum.LEFT);
    component.placePlane({x:8, y:7}, DirectionEnum.LEFT);
    
    
    expect(component.allPlanePlaced).toBeTruthy();
  });

  it('should use board cell', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-gameboard-cell')).not.toBe(null);
  }));

  it('should rotation button component', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-plane-rotation-buttons')).not.toBe(null);
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


    let factory = new PlaneDrawerFactory(null);
    let spy = spyOn(factory, 'get').and.returnValue(new FakePlaneDrawer());

    let plane = new Plane(factory.get(), coordinate);

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


    let factory = new PlaneDrawerFactory(null);
    let spy = spyOn(factory, 'get').and.returnValue(new FakePlaneDrawer());

    let plane = new Plane(factory.get(), coordinate);

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


    let factory = new PlaneDrawerFactory(null);
    let spy = spyOn(factory, 'get').and.returnValue(new FakePlaneDrawer());

    let plane = new Plane(factory.get(), coordinate);

    component.drawPlaneOnCells(plane, coordinate);

    expect(cells[0][0].state).toEqual(BoardCellStateEnum.HIGHLIGHTED);
    expect(cells[0][1].state).toEqual(BoardCellStateEnum.RESERVED);
    expect(cells[1][0].state).toEqual(BoardCellStateEnum.FREE);
    expect(cells[1][1].state).toEqual(BoardCellStateEnum.RESERVED);
  });


  it('should rotate the plane', () => {
    component.currentPlane = new Plane(new PlaneDrawerUp(5), {x:1, y:1});

    component.rotatePlane(DirectionEnum.UP);

    expect(component.currentPlane.drawer instanceof PlaneDrawerUp).toBeTruthy();
  });
});
