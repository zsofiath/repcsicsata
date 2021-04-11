import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { BoardCellStateEnum } from 'src/app/constants/BoardCellStatesEnum';
import { PlanePartsEnum } from 'src/app/constants/PlanePartsEnum';
import BoardCell from 'src/app/model/BoardCell';
import Coordinate from 'src/app/model/Coordinate';
import FakePlaneDrawer from 'src/app/model/planeDrawer/FakePlaneDrawer';
import { BattleService } from 'src/app/services/battle.service';
import FakePlane from 'src/testMocks/MockPlane';
import { GameboardCellComponent } from '../gameboard-cell/gameboard-cell.component';
import { GameboardComponent } from '../gameboard/gameboard.component';

import { BattleComponent } from './battle.component';

describe('BattleComponent creations', () => {
  it('should create with starting state', () => {
    TestBed.configureTestingModule({
      declarations: [ BattleComponent,  GameboardComponent, GameboardCellComponent],
      providers: [{provide: BattleService, useValue: {
        sendShooting: (position: Coordinate) => new Observable(obs => {
          obs.next([
            new FakePlane()
          ]);
        }),
        getOwnPlanes: () => of([new FakePlane()]),
        isStartingPlayer: () => of(true),
        listenForShooting: () => of({})
      }}]
    })
    .compileComponents();
    let fixture = TestBed.createComponent(BattleComponent);
    let component = fixture.componentInstance;
    spyOn(component.battleService, 'getOwnPlanes').and.returnValue(of([new FakePlane()]));

    let el = fixture.debugElement;

    
    fixture.detectChanges();

    expect(component.isWaitingForEnemyToShoot).toBeFalsy();
  });

  it('should create without starting state', () => {
    TestBed.configureTestingModule({
      declarations: [ BattleComponent,  GameboardComponent, GameboardCellComponent],
      providers: [{provide: BattleService, useValue: {
        sendShooting: (position: Coordinate) => new Observable(obs => {
          obs.next([
            new FakePlane()
          ]);
        }),
        getOwnPlanes: () => of([new FakePlane()]),
        isStartingPlayer: () => of(false),
        listenForShooting: () => of({})
      }}]
    })
    .compileComponents();
    let fixture = TestBed.createComponent(BattleComponent);
    let component = fixture.componentInstance;
    spyOn(component.battleService, 'getOwnPlanes').and.returnValue(of([new FakePlane()]));

    let el = fixture.debugElement;

    
    fixture.detectChanges();

    expect(component.isWaitingForEnemyToShoot).toBeTruthy();
  });
});


describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattleComponent,  GameboardComponent, GameboardCellComponent],
      providers: [{provide: BattleService, useValue: {
        sendShooting: (position: Coordinate) => new Observable(obs => {
          obs.next([
            new FakePlane()
          ]);
        }),
        getOwnPlanes: () => of([new FakePlane()]),
        isStartingPlayer: () => of(true),
        listenForShooting: () => of({})
      }}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    spyOn(component.battleService, 'getOwnPlanes').and.returnValue(of([new FakePlane()]));

    el = fixture.debugElement;

    
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get own planes create', fakeAsync(() => {

    component.ownPlanes$.subscribe(planes => {
      expect(planes.length).toEqual(1);
    });


    flush();


  }));

  it('should use gameboard', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-gameboard')).not.toBeNull();
  });

  it('should draw only one cell when moving the tartgetcross', () => {
    expect(component.targetCross.getCoordinates().length).toBe(1);
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

    spyOn(component.battleService, 'sendShooting').and.returnValue(of({won: false, elements: []}));

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

  it('should change plane list when shoot is competed in the service', fakeAsync(() => {

    let hitPlanes = [new FakePlane()];
    spyOn(component.battleService, 'sendShooting').and.returnValue(of({won: false, elements: hitPlanes}));
    spyOn(component.hitPlanes, 'next');

    component.confirmShoot();

    flush();

    expect(component.hitPlanes.next).toHaveBeenCalledWith(hitPlanes);

  }));

  it('should show you won message', fakeAsync(() => {
    spyOn(component.battleService, 'sendShooting').and.returnValue(of({won: true, elements: []}));
    spyOn(component.hitPlanes, 'next');

    component.confirmShoot();

    flush();

    fixture.detectChanges();

    let element = el.queryAll(By.css(".victory-message"));

    expect(element.length).toBe(1);

  }));

  it('should NOT show you won message', fakeAsync(() => {
    spyOn(component.battleService, 'sendShooting').and.returnValue(of({won: false, elements: []}));
    spyOn(component.hitPlanes, 'next');

    component.confirmShoot();

    flush();

    fixture.detectChanges();

    let element = el.queryAll(By.css(".victory-message"));

    expect(element.length).toBe(0);

  }));

  it('should hide confirmation after sucessfull shooting', fakeAsync(() => {
    component.confirmationWindowVisible = true;

    let hitPlanes = [new FakePlane()];
    spyOn(component.battleService, 'sendShooting').and.returnValue(of({won: false, elements: hitPlanes}));

    component.confirmShoot();

    flush();

    expect(component.confirmationWindowVisible).toBeFalsy();

  }));

  it('should use one more board for own planes', () => {
    fixture.detectChanges();
    const el = fixture.debugElement;
    let element = el.queryAll(By.css("app-gameboard"));

    expect(element.length).toEqual(2);
  });

  it('should check enemy shooting', () => {
    component.confirmationWindowVisible = true;
    component.targetCross = new FakePlane();
    component.targetCross.position.x = 1;
    component.targetCross.position.y = 2;
    component.isWaitingForEnemyToShoot = false;
    fixture.detectChanges();

    spyOn(component.battleService, 'sendShooting').and.returnValue(of({won: false, elements: []}));
    spyOn(component.battleService, 'listenForShooting').and.returnValue(of({}));

    let element = el.queryAll(By.css(".confirm-button"));
    element[0].triggerEventHandler('click', null);

    expect(component.battleService.listenForShooting).toHaveBeenCalled();

  });

  it('should not check enemy shooting if player won', () => {
    component.confirmationWindowVisible = true;
    component.targetCross = new FakePlane();
    component.targetCross.position.x = 1;
    component.targetCross.position.y = 2;
    component.isWaitingForEnemyToShoot = false;
    fixture.detectChanges();

    spyOn(component.battleService, 'sendShooting').and.returnValue(of({won: true, elements: []}));
    spyOn(component.battleService, 'listenForShooting').and.returnValue(of({}));

    let element = el.queryAll(By.css(".confirm-button"));
    element[0].triggerEventHandler('click', null);

    expect(component.battleService.listenForShooting).not.toHaveBeenCalled();

  });

  it('should enable (current player shoot) and disable (other player shoot) gameboard ', () => {
    component.confirmationWindowVisible = true;
    component.targetCross = new FakePlane();
    component.targetCross.position.x = 1;
    component.targetCross.position.y = 2;
    component.isWaitingForEnemyToShoot = false;
    fixture.detectChanges();

    spyOn(component.battleService, 'sendShooting').and.returnValue(of({won: false, elements: []}));
    spyOn(component.battleService, 'listenForShooting').and.returnValue(new Observable(o => {
      setTimeout(() => {
        o.next({});
      }, 500);
    }));

    let element = el.queryAll(By.css(".confirm-button"));

    jasmine.clock().install();


    element[0].triggerEventHandler('click', null);

    expect(component.isWaitingForEnemyToShoot).toBeTruthy();
    jasmine.clock().tick(101);
    expect(component.isWaitingForEnemyToShoot).toBeTruthy();
    jasmine.clock().tick(501);
    expect(component.isWaitingForEnemyToShoot).toBeFalsy();

    jasmine.clock().uninstall();

  });

  it('should show you lost message if player lost ', () => {
    component.confirmationWindowVisible = true;
    component.targetCross = new FakePlane();
    component.targetCross.position.x = 1;
    component.targetCross.position.y = 2;
    component.isWaitingForEnemyToShoot = false;
    fixture.detectChanges();

    spyOn(component.battleService, 'sendShooting').and.returnValue(of({won: false, elements: []}));
    spyOn(component.battleService, 'listenForShooting').and.returnValue(new Observable(o => {
      setTimeout(() => {
        o.next({lost: true});
      }, 500);
    }));

    let element = el.queryAll(By.css(".confirm-button"));

    jasmine.clock().install();


    element[0].triggerEventHandler('click', null);

    expect(component.isLost).toBeFalsy();

    jasmine.clock().tick(501);
    expect(component.isLost).toBeTruthy();

    jasmine.clock().uninstall();

  });

 
  
});
