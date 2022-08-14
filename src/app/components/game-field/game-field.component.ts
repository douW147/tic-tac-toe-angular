import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.css']
})
export class GameFieldComponent implements OnInit {

  @Input() fieldSize!: number;
  @Input() gameField!: string[];
  
  fieldSizeArray: string[] = [];
  allCells = this.getAllCells();
  

  constructor() { 
  }

  ngOnInit(): void {
    this.fieldSizeArray = Array(this.fieldSize).fill("");
    const allCells = this.getAllCells();
    console.log(allCells.length)
  }

  getAllCells() {
    const allCells = document.getElementsByClassName("game-field__game-cell");
    return allCells;
  }

}
