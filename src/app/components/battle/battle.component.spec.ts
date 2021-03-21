import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { PlanePartsEnum } from 'src/app/constants/PlanePartsEnum';
import BoardCell from 'src/app/model/BoardCell';
import Coordinate from 'src/app/model/Coordinate';
import FakePlaneDrawer from 'src/app/model/planeDrawer/FakePlaneDrawer';
import FakePlane from 'src/testMocks/MockPlane';
import { GameboardCellComponent } from '../gameboard-cell/gameboard-cell.component';
import { GameboardComponent } from '../gameboard/gameboard.component';

import { BattleComponent } from './battle.component';

describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleComponent,  GameboardComponent, GameboardCellComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
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
    let plane = new FakePlane();
    component.targetCross = plane;
    component.onCellClick();

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

  it('should send shot to service', () => {
    component.confirmationWindowVisible = true;
    component.targetCross = new FakePlane();
    component.targetCross.position.x = 1;
    component.targetCross.position.y = 2;
    fixture.detectChanges();

    spyOn(component.battleService, 'sendShooting');

    let element = el.queryAll(By.css(".confirm-button"));
    element[0].triggerEventHandler('click', null);

    expect(component.battleService.sendShooting).toHaveBeenCalledWith({x:1, y:2});
  });

  it('should close confirm window on cancel', () => {
    component.confirmationWindowVisible = true;
    fixture.detectChanges();

    let element = el.queryAll(By.css(".confirm-cancel-button"));
    element[0].triggerEventHandler('click', null);

    expect(component.confirmationWindowVisible).toBeFalsy();
  });
  
});
