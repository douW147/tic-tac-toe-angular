import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-input',
  templateUrl: './game-input.component.html',
  styleUrls: ['./game-input.component.css']
})
export class GameInputComponent implements OnInit {

  inputValue: number = 3;

  constructor() { }

  ngOnInit(): void {
  }

  modelChanged(value: Event) {
    console.log(value.target)
    this.inputValue = 10;
  }
}
