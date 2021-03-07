import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import Plane from 'src/app/model/Plane';

import { SavePlacedPlanesComponent } from './save-placed-planes.component';

describe('SavePlacedPlanesComponent', () => {
  let component: SavePlacedPlanesComponent;
  let fixture: ComponentFixture<SavePlacedPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavePlacedPlanesComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePlacedPlanesComponent);
    component = fixture.componentInstance;
    component.$planes = new BehaviorSubject([]);

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

  it('should change planes array when planes number changes', fakeAsync(() => {
    component.$planes.next([new Plane(null, null)]);

    flush();

    expect(component.planes.length).toEqual(1);
  }));

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

  it('should display - Go - when 4 plane is placed', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    component.$planes.next([new Plane(null, null), new Plane(null, null), new Plane(null, null), new Plane(null, null)]);
    flush();
    
    fixture.detectChanges();

    expect(compiled.querySelector('button').innerText).toBe('Go');
    expect(fixture.debugElement.queryAll(By.css('.ready')).length).toEqual(1);
    expect(compiled.querySelector('button').disabled).toBeFalsy();

  }));

  it('should fire request method', () => {

    let ovserverSubscribed = false;
    
    spyOn(component.preparationService, 'sendPlanes').and.returnValue(new Observable(observer=> {
      ovserverSubscribed = true;
    }));

    spyOn(component, 'getUnplacedPlanesNumber').and.returnValue(0);

    fixture.detectChanges();

    const readyButton = fixture.debugElement.queryAll(By.css('.ready'))[0];

    readyButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(ovserverSubscribed).toBeTruthy();
    expect(component.preparationService.sendPlanes).toHaveBeenCalled();

  });

  it('should set button disabled', () => {
    spyOn(component, 'getUnplacedPlanesNumber').and.returnValue(0);

    fixture.detectChanges();

    const readyButton = fixture.debugElement.queryAll(By.css('.ready'))[0];
    const compiled = fixture.debugElement.nativeElement;

    readyButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.loading).toBeTruthy();
    expect(compiled.querySelector('button').disabled).toBeTruthy();
  });
});
