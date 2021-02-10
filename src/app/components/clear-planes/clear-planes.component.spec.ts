import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

});
