import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { PlanePartsEnum } from 'src/app/constants/PlanePartsEnum';
import BoardCell from 'src/app/model/BoardCell';
import Coordinate from 'src/app/model/Coordinate';
import Plane from 'src/app/model/Plane';
import FakePlaneDrawer from 'src/app/model/planeDrawer/FakePlaneDrawer';
import PlaneDrawerLeft from 'src/app/model/planeDrawer/PlaneDrawerLeft';
import PlaneDrawerPart from 'src/app/model/planeDrawer/PlaneDrawerPart';
import TargetCrossDrawer from 'src/app/model/planeDrawer/TargetCrossDrawer';
import PlanePart from 'src/app/model/PlanePart';
import TargetCross from 'src/app/model/TargetCross';
import FakePlane from 'src/testMocks/MockPlane';
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

  it('should change board on hover', () => {
    let cells = [];
    for (let i = 0; i < 2; i++) {
      let c1 = new BoardCell();
      c1.state = BoardCellStateEnum.FREE;
      c1.x = 0;
      c1.y = i;      
      let c2 = new BoardCell();
      c2.state = BoardCellStateEnum.FREE;
      c2.x = 1;
      c2.y = i;  
      cells.push([
        c1,
        c2,
      ]);
    }
    
    let plane = new FakePlane();
    let fakeDrawer1 = new FakePlaneDrawer();
    plane.drawer = fakeDrawer1;
    let coordinate = new Coordinate()
    coordinate.x=1;
    coordinate.y=1;

    component.onCellHover({activeElement: plane, cells: cells, coordinate: coordinate})

    expect(cells[1][1].planePart.part).toEqual(PlanePartsEnum.TARGET_CROSS);
    expect(cells[1][1].state).toEqual(BoardCellStateEnum.HIGHLIGHTED);
  });

  it('should open confirmation window when clicking empty field', () => {
    let cells = [[new BoardCell()]];
    let plane = new FakePlane();
    let fakeDrawer1 = new FakePlaneDrawer();
    component.onCellClick(plane, cells);

    expect(component.confirmationWindowVisible).toBeTruthy();
  });

  it('should pop up confirmation', () => {
    component.confirmationWindowVisible = true;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    let el = fixture.debugElement;
    let element = el.queryAll(By.css(".confirmation"));
    expect(element[0]).toBeTruthy();
    expect(element.length).toBe(1);

    const confirmButton = element[0].queryAll(By.css('.confirm-button'));
    const cancelButton = element[0].queryAll(By.css('.confirm-cancel-button'));
    expect(confirmButton.length).toBe(1);
    expect(confirmButton[0].nativeElement.innerText).toBe('confirm_shooting');
    expect(cancelButton.length).toBe(1);
    expect(cancelButton[0].nativeElement.innerText).toBe('confirm_cancel');
  });

  it('should hide confirmation', () => {
    component.confirmationWindowVisible = false;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    let el = fixture.debugElement;
    let element = el.queryAll(By.css(".confirmation"));
    expect(element.length).toBe(0);
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
