import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
    el = fixture.debugElement;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set its class following the BoardCell\'s state - boardCell free --> .cell-free', () => {
    component.properties = new BoardCell();
    component.properties.state = BoardCellStateEnum.FREE;

    fixture.detectChanges();
    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('cell-free')).toBeTruthy();
  });

  it('should set its class following the BoardCell\'s state - boardCell highlighted --> .cell-highlighted', () => {
    component.properties = new BoardCell();
    component.properties.state = BoardCellStateEnum.HIGHLIGHTED;

    fixture.detectChanges();
    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('cell-highlighted')).toBeTruthy();
  });

  it('should set its class following the BoardCell\'s state - boardCell error --> .cell-error', () => {
    component.properties = new BoardCell();
    component.properties.state = BoardCellStateEnum.ERROR;

    fixture.detectChanges();
    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('cell-error')).toBeTruthy();
  });

  it('should set its class following the BoardCell\'s state - boardCell reserved --> .cell-reserved', () => {
    component.properties = new BoardCell();
    component.properties.state = BoardCellStateEnum.RESERVED;

    fixture.detectChanges();
    let element = el.queryAll(By.css(".cell"));

    expect(element[0].nativeElement.classList.contains('cell-reserved')).toBeTruthy();
  });
});
