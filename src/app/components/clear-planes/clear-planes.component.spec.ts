import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
});
