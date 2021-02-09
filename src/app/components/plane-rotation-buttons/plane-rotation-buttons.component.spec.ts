import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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
});
