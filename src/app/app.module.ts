import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameboardComponent } from './components/gameboard/gameboard.component';
import { GameboardCellComponent } from './components/gameboard-cell/gameboard-cell.component';
import { PlaneRotationButtonsComponent } from './components/plane-rotation-buttons/plane-rotation-buttons.component';
import { ClearPlanesComponent } from './components/clear-planes/clear-planes.component';

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    GameboardCellComponent,
    PlaneRotationButtonsComponent,
    ClearPlanesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
