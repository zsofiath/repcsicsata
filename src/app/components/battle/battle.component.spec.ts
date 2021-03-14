import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameboardCellComponent } from '../gameboard-cell/gameboard-cell.component';
import { GameboardComponent } from '../gameboard/gameboard.component';

import { BattleComponent } from './battle.component';

describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleComponent,  GameboardComponent, GameboardCellComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use gameboard', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-gameboard')).not.toBeNull();
  });

  // should show one cell on hover
  it('should draw only one cell when moving the tartgetcross', () => {
    expect(component.targetCross.getCoordinates().length).toBe(1);
  });

  // should show hit plane parts
  // should show dead planes
  // should show missed shots
  // should show not found planes number
  // should show damaged planes number
  // should show dead planes number
  // should show confirmation window before commiting a shoot
  // show victory when all planes are shot
});
