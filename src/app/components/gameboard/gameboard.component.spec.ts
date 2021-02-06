import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DirectionEnum } from 'src/app/constants/DirectionEnum';

import { GameboardComponent } from './gameboard.component';

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameboardComponent ]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(GameboardComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create 10*10 table as gameboard', () => {
    let gameboard = el.queryAll(By.css("#gameboard"));

    console.log(gameboard);
    
    expect(gameboard).toBeTruthy("Could not find gameboard");
    expect(gameboard.length).toEqual(1, "Could not find gameboard");
    expect(gameboard[0].nativeElement.childNodes.length).toEqual(10, "Not enough rows");
    expect(gameboard[0].nativeElement.childNodes[0].childNodes.length).toEqual(10, "Not enough columns");
  });

  it('should place planes', () => {
    component.placePlane({x:3, y:2}, DirectionEnum.UP);
    
    expect(component.planes[0].position.x).toEqual(3);
    expect(component.planes[0].position.y).toEqual(2);
    expect(component.planes[0].direction).toEqual(DirectionEnum.UP);
  });

  it('should not place plane on the top op an other plane', () => {
    component.placePlane({x:3, y:2}, DirectionEnum.UP);
    
    
    expect(function(){
      component.placePlane({x:3, y:2}, DirectionEnum.UP);
    }).toThrow(new Error('Bad position'));
  });
});
