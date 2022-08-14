import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { GameFieldComponent } from './components/game-field/game-field.component';
import { GameCellComponent } from './components/game-cell/game-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    TicTacToeComponent,
    GameFieldComponent,
    GameCellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
