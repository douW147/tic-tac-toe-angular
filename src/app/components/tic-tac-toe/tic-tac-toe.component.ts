import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tic-tac-toe',
    templateUrl: './tic-tac-toe.component.html',
    styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
    fieldSize: number = 3;
    gameField: string[] = Array(this.fieldSize * this.fieldSize).fill("")

    constructor() {
    }

    ngOnInit(): void {
    }

}
