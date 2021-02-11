import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import BoardCell from 'src/app/model/BoardCell';

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
