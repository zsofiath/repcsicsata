import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { GameboardCellComponent } from '../gameboard-cell/gameboard-cell.component';
import { GameboardComponent } from '../gameboard/gameboard.component';
import { ClearPlanesComponent } from './clear-planes/clear-planes.component';
import { PlaneRotationButtonsComponent } from './plane-rotation-buttons/plane-rotation-buttons.component';
import { PreparationComponent } from './preparation.component';
import { SavePlacedPlanesComponent } from './save-placed-planes/save-placed-planes.component';

describe('PreparationComponent', () => {
  let component: PreparationComponent;
  let fixture: ComponentFixture<PreparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PreparationComponent,
        GameboardComponent,
        PlaneRotationButtonsComponent,
        GameboardCellComponent,
        ClearPlanesComponent,
        SavePlacedPlanesComponent
      ],
      imports: [HttpClientTestingModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use gameboard', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-gameboard')).not.toBe(null);
  }));

  it('should use clearAll button', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-clear-planes')).not.toBe(null);
  }));

  it('should use SavePlacedPlanes button', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('app-save-placed-planes')).not.toBeNull();
  });

  it('should use rotation button component', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-plane-rotation-buttons')).not.toBe(null);
  }));

  
});
