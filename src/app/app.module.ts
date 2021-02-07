import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameboardComponent } from './components/gameboard/gameboard.component';
import { GameboardCellComponent } from './components/gameboard-cell/gameboard-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    GameboardCellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
