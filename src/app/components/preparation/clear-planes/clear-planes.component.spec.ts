import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import BoardCell from 'src/app/model/BoardCell';
import Plane from 'src/app/model/Plane';
import PlanePart from 'src/app/model/PlanePart';
import FakePlane from 'src/testMocks/MockPlane';

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


  it('should delete all planes', fakeAsync(() => {
    component.$planes = new BehaviorSubject([new FakePlane()]);

    let el = fixture.debugElement.queryAll(By.css('.clear-all'))[0];

    el.triggerEventHandler('click', null);

    component.$planes.subscribe(
      planes => {
        expect(planes).toEqual([]);
      }
    );

    flush();
    

  }));

});
