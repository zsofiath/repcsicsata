import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';
import PlaneDrawerUp from 'src/app/model/planeDrawer/PlaneDrawerUp';
import { GameboardCellComponent } from '../gameboard-cell/gameboard-cell.component';

import { GameboardComponent } from './gameboard.component';

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameboardComponent, GameboardCellComponent ]
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
    
    console.log(component.planes[0]);
    

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

  it('should use bord cell', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-gameboard-cell')).not.toBe(null);
  }));
});
