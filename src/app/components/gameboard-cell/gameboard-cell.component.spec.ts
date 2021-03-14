import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';
import { PlanePartsEnum } from 'src/app/constants/PlanePartsEnum';
import BoardCell from 'src/app/model/BoardCell';
import PlanePart from 'src/app/model/PlanePart';

import { GameboardCellComponent } from './gameboard-cell.component';

describe('GameboardCellComponent', () => {
  let component: GameboardCellComponent;
  let fixture: ComponentFixture<GameboardCellComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameboardCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameboardCellComponent);
    component = fixture.componentInstance;
    component.properties = new BoardCell();
    component.properties.planePart = new PlanePart();
    el = fixture.debugElement;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set its class following the BoardCell\'s state - boardCell free --> .cell-free', () => {
    component.properties.state = BoardCellStateEnum.FREE;

    fixture.detectChanges();
    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('cell-free')).toBeTruthy();
  });

  it('should set its class following the BoardCell\'s state - boardCell highlighted --> .cell-highlighted', () => {
    
    component.properties.state = BoardCellStateEnum.HIGHLIGHTED;

    fixture.detectChanges();
    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('cell-highlighted')).toBeTruthy();
  });

  it('should set its class following the BoardCell\'s state - boardCell error --> .cell-error', () => {
    component.properties.state = BoardCellStateEnum.ERROR;

    fixture.detectChanges();
    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('cell-error')).toBeTruthy();
  });

  it('should set its class following the BoardCell\'s state - boardCell reserved and error --> .cell-reserve.cell-error', () => {
    component.properties.state = BoardCellStateEnum.RESERVED;

    fixture.detectChanges();

    component.properties.setErrored();
    fixture.detectChanges();

    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('cell-error')).toBeTruthy();
    expect(element[0].nativeElement.classList.contains('cell-reserved')).toBeTruthy();
  });

  it('should set its class following the BoardCell\'s state - boardCell reserved --> .cell-reserved', () => {
    component.properties.state = BoardCellStateEnum.RESERVED;

    fixture.detectChanges();
    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('cell-reserved')).toBeTruthy();
  });

  it('should set the direction class - up', () => {
    component.properties.planePart.direction = DirectionEnum.UP;

    fixture.detectChanges();
    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('up')).toBeTruthy();
  });

  it('should set the direction class - down', () => {
    component.properties.planePart.direction = DirectionEnum.DOWN;

    fixture.detectChanges();
    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('down')).toBeTruthy();
  });

  it('should set the direction class - left', () => {
    component.properties.planePart.direction = DirectionEnum.LEFT;

    fixture.detectChanges();
    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('left')).toBeTruthy();
  });

  it('should set the direction class - right', () => {
    component.properties.planePart.direction = DirectionEnum.RIGHT;

    fixture.detectChanges();
    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('right')).toBeTruthy();
  });

  it('should set the part class - head', () => {
    component.properties.planePart.part = PlanePartsEnum.HEAD;

    fixture.detectChanges();
    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('head')).toBeTruthy();
  });

  it('should set the part class - body', () => {
    component.properties.planePart.part = PlanePartsEnum.BODY;

    fixture.detectChanges();
    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('body')).toBeTruthy();
  });

  it('should set the part class - wings', () => {
    for (let i = 1; i < 6; i++) {
      component.properties.planePart.part = PlanePartsEnum['WING'+i];
      fixture.detectChanges();
      let element = el.queryAll(By.css(".cell"));

      expect(element[0].nativeElement.classList.contains('wing-'+i)).toBeTruthy();
    }
  });

  it('should set the part class - tails', () => {
    for (let i = 1; i < 4; i++) {
      component.properties.planePart.part = PlanePartsEnum['TAIL'+i];
      fixture.detectChanges();
      let element = el.queryAll(By.css(".cell"));

      expect(element[0].nativeElement.classList.contains('tail-'+i)).toBeTruthy();
    }
  });

  it('should set the part class - targetcross', () => {
      component.properties.planePart.part = PlanePartsEnum.TARGET_CROSS;
      fixture.detectChanges();
      let element = el.queryAll(By.css(".cell"));

      expect(element[0].nativeElement.classList.contains('target-cross')).toBeTruthy();
  });

  it('should trigger an event on hover', fakeAsync(() => {
    component.properties = new BoardCell();
    component.properties.x=1;
    component.properties.y=1;
    let element = el.queryAll(By.css(".cell"));

    let x, y;
    component.hoverEvent.subscribe((position)=> {
      x=position.x;
      y=position.y;
    });

    element[0].triggerEventHandler('mouseover', null);

    flush();

    expect(x).toEqual(1);
    expect(y).toEqual(1);
  }));

  it('should trigger an event on click', fakeAsync(() => {
    component.properties = new BoardCell();
    component.properties.x=1;
    component.properties.y=1;
    let element = el.queryAll(By.css(".cell"));

    let x, y;
    component.clickEvent.subscribe((position)=> {
      x=position.x;
      y=position.y;
    });

    element[0].triggerEventHandler('click', null);

    flush();

    expect(x).toEqual(1);
    expect(y).toEqual(1);
  }));
});
