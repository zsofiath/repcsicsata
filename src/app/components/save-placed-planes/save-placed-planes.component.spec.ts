import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePlacedPlanesComponent } from './save-placed-planes.component';

describe('SavePlacedPlanesComponent', () => {
  let component: SavePlacedPlanesComponent;
  let fixture: ComponentFixture<SavePlacedPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavePlacedPlanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePlacedPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
