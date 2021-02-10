import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import BoardCell from 'src/app/model/BoardCell';
import Plane from 'src/app/model/Plane';

import { ClearPlanesComponent } from './clear-planes.component';

describe('ClearPlanesComponent', () => {
  let component: ClearPlanesComponent;
  let fixture: ComponentFixture<ClearPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearPlanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button with class .clear-all', () => {
    expect(fixture.debugElement.queryAll(By.css('.clear-all')).length).toBe(1);
  });

  fit('should delete planes, but not changing reference', fakeAsync(() => {
    let arr = [new Plane(null, null), new Plane(null, null), new Plane(null, null)];
    component.planes = arr;
    component.cells = [[]];

    let el = fixture.debugElement.queryAll(By.css('.clear-all'))[0];

    el.triggerEventHandler('click', null);

    flush();

    expect(arr.length).toEqual(0);
    expect(Object.is(arr, component.planes)).toBeTruthy();
  }));

  it('should set all cells free', fakeAsync(() => {
    component.cells = [[new BoardCell(0,0)]];
    component.planes = [];

    let el = fixture.debugElement.queryAll(By.css('.clear-all'))[0];

    el.triggerEventHandler('click', null);

    flush();
    
    expect(component.cells[0][0].state).toEqual(BoardCellStateEnum.FREE);
  }));

});
