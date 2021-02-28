import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';

import { PlaneRotationButtonsComponent } from './plane-rotation-buttons.component';

describe('PlaneRotationButtonsComponent', () => {
  let component: PlaneRotationButtonsComponent;
  let fixture: ComponentFixture<PlaneRotationButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneRotationButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneRotationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create turn up button', () => {
    let el = fixture.debugElement.queryAll(By.css('.turn-up'));
    expect(el.length).toBe(1);
  });

  it('should create turn down button', () => {
    let el = fixture.debugElement.queryAll(By.css('.turn-down'));
    expect(el.length).toBe(1);
  });

  it('should create turn left button', () => {
    let el = fixture.debugElement.queryAll(By.css('.turn-left'));
    expect(el.length).toBe(1);
  });

  it('should create turn right button', () => {
    let el = fixture.debugElement.queryAll(By.css('.turn-right'));
    expect(el.length).toBe(1);
  });

  it('should trigger an event on click (right)', fakeAsync(() => {
    let element = fixture.debugElement.queryAll(By.css('.turn-right'));

    let dir;
    component.clickEvent.subscribe((direction)=> {
      dir = direction;
    });

    element[0].triggerEventHandler('click', null);

    flush();

    expect(dir).toEqual(DirectionEnum.RIGHT);
  }));

  it('should trigger an event on click (left)', fakeAsync(() => {
    let element = fixture.debugElement.queryAll(By.css('.turn-left'));

    let dir;
    component.clickEvent.subscribe((direction)=> {
      dir = direction;
    });

    element[0].triggerEventHandler('click', null);

    flush();

    expect(dir).toEqual(DirectionEnum.LEFT);
  }));

  it('should trigger an event on click (up)', fakeAsync(() => {
    let element = fixture.debugElement.queryAll(By.css('.turn-up'));

    let dir;
    component.clickEvent.subscribe((direction)=> {
      dir = direction;
    });

    element[0].triggerEventHandler('click', null);

    flush();

    expect(dir).toEqual(DirectionEnum.UP);
  }));

  it('should trigger an event on click (down)', fakeAsync(() => {
    let element = fixture.debugElement.queryAll(By.css('.turn-down'));

    let dir;
    component.clickEvent.subscribe((direction)=> {
      dir = direction;
    });

    element[0].triggerEventHandler('click', null);

    flush();

    expect(dir).toEqual(DirectionEnum.DOWN);
  }));
});
