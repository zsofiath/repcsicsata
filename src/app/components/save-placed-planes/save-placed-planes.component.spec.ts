import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import Plane from 'src/app/model/Plane';

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
    component.planes = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a button', () => {
    const compiled = fixture.debugElement.nativeElement;

   expect(compiled.querySelector('button')).not.toBeNull();
   expect(fixture.debugElement.queryAll(By.css('button')).length).toEqual(1);

  });

  it('should display - 3 more to place - when 1 plane is placed', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.planes = [new Plane(null, null)];

    fixture.detectChanges();

    expect(compiled.querySelector('button').innerText).toBe('3 more to place');
    expect(compiled.querySelector('button').disabled).toBeTruthy();

  });

  it('should display - 2 more to place - when 2 plane is placed', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.planes = [new Plane(null, null), new Plane(null, null)];

    fixture.detectChanges();

    expect(compiled.querySelector('button').innerText).toBe('2 more to place');
    expect(compiled.querySelector('button').disabled).toBeTruthy();
  });

  it('should display - 1 more to place - when 3 plane is placed', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.planes = [new Plane(null, null), new Plane(null, null), new Plane(null, null)];

    fixture.detectChanges();

    expect(compiled.querySelector('button').innerText).toBe('1 more to place');
    expect(compiled.querySelector('button').disabled).toBeTruthy();
  });

  it('should display - Go - when 4 plane is placed', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.planes = [new Plane(null, null), new Plane(null, null), new Plane(null, null), new Plane(null, null)];
    fixture.detectChanges();

    expect(compiled.querySelector('button').innerText).toBe('Go');
    expect(fixture.debugElement.queryAll(By.css('.ready')).length).toEqual(1);
    expect(compiled.querySelector('button').disabled).toBeFalsy();

  });
});
