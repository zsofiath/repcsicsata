import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';

import { GameboardComponent } from './gameboard.component';

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameboardComponent ]
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

  it('should place planes', () => {
    component.placePlane({x:3, y:2}, DirectionEnum.UP);
    
    expect(component.planes[0].position.x).toEqual(3);
    expect(component.planes[0].position.y).toEqual(2);
    expect(component.planes[0].direction).toEqual(DirectionEnum.UP);
    expect(component.cells[2][3].state).toBe(BoardCellStateEnum.RESERVED);
  });

  it('should not place plane on the top op an other plane', () => {
    component.placePlane({x:3, y:2}, DirectionEnum.UP);
    
    
    expect(function(){
      component.placePlane({x:3, y:2}, DirectionEnum.UP);
    }).toThrow(new Error('Bad position'));
  });
});
