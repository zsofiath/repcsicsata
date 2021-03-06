import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameboardComponent } from './components/gameboard/gameboard.component';
import { GameboardCellComponent } from './components/gameboard-cell/gameboard-cell.component';
import { PlaneRotationButtonsComponent } from './components/preparation/plane-rotation-buttons/plane-rotation-buttons.component';
import { ClearPlanesComponent } from './components/preparation/clear-planes/clear-planes.component';
import { SavePlacedPlanesComponent } from './components/preparation/save-placed-planes/save-placed-planes.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PreparationComponent } from './components/preparation/preparation.component';
import { BattleComponent } from './components/battle/battle.component';

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    GameboardCellComponent,
    PlaneRotationButtonsComponent,
    ClearPlanesComponent,
    SavePlacedPlanesComponent,
    PreparationComponent,
    BattleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
