import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tic-tac-toe',
    templateUrl: './tic-tac-toe.component.html',
    styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
    fieldSize: number = 3;
    gameField: string[] = Array(this.fieldSize * this.fieldSize).fill("");
    gameFieldWithRowAndCols: string[][] = []
    cellsForWin: number = 3;

    inputValueFieldSize: number = 3;
    inputValueCellsForWin: number = 3
    
    firstStepSymbol: string = "X";
    secondStepSymbol: string = "O"
    currentStepSymbol: string = this.firstStepSymbol;

    isGameVsComputer: boolean = false;
    isGameEnds: boolean = false;

    is1vs1ClickAvailible: boolean = false;
    is1vsPcClickAvailible: boolean = true;

    gameMessage: string = "";

    ngOnInit(): void {
        // const cells: HTMLElement[] = document.getElementsByClassName("game-field__game-cell") ;
        // const cell = cells[0]
    }

    refresh() {
        this.gameField = Array(this.fieldSize * this.fieldSize).fill("");
        this.currentStepSymbol = this.firstStepSymbol;
        this.isGameEnds = false;
        this.gameMessage = "";
    }

    getCellNumber(event: MouseEvent): number {
        const clickedCellId  = (event.target as Element).id;
        const clickedCellNumber = parseInt(clickedCellId.slice(4));

        return clickedCellNumber;
    }

    getRandomCellIdForComputerStep(): number {
        while (true) {
            const randomCellId = Math.floor(Math.random() * this.gameField.length);

            if (!this.isCellTaken(randomCellId)) {
                return randomCellId;
            }
        }
    }

    isCellTaken(cellId: number): boolean {
        return this.gameField[cellId] !== "";
    }
    
    isAllCellsTaken(): boolean {
        return this.gameField.every(cell => cell !== "");
    }

    isComputerCanStep() {
        return this.isGameVsComputer === true && this.isAllCellsTaken() === false;
    }

    isWinCombination(currentSymbol: string): boolean {
        this.gameFieldWithRowAndCols = this.generateFieldWithRowAndCols();

        if (this.isWinOnRow(currentSymbol)) {
            return true;
        }

        if (this.isWinOnColumn(currentSymbol)) {
            return true;
        }

        if (this.isWinOnMainDiagonal(currentSymbol)) {
            return true;
        }

        if (this.isWinOnSecondaryDiagonal(currentSymbol)) {
            return true;
        }

        return false;
    }

    isWinOnRow(currentSymbol: string) {
        for (let rowIndex = 0; rowIndex < this.gameFieldWithRowAndCols.length; rowIndex++) {
            let currentStrick = 0;

            for (let columnIndex = 0; columnIndex < this.gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                if (this.gameFieldWithRowAndCols[rowIndex][columnIndex] === currentSymbol) {
                    currentStrick++;
                } else {
                    currentStrick = 0;
                }

                if (currentStrick === this.cellsForWin) {
                    return true;
                }
            }
        }
        return false
    }

    isWinOnColumn(currentSymbol: string) {
        for (let rowIndex = 0; rowIndex < this.gameFieldWithRowAndCols.length; rowIndex++) {
            let currentStrick = 0;

            for (let columnIndex = 0; columnIndex < this.gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                if (this.gameFieldWithRowAndCols[columnIndex][rowIndex] === currentSymbol) {
                    currentStrick++;
                } else {
                    currentStrick = 0;
                }

                if (currentStrick === this.cellsForWin) {
                    return true;
                }
            }
        }
        return false
    }

    isWinOnMainDiagonal(currentSymbol: string) {
        for (let rowIndex = 0; rowIndex < this.gameFieldWithRowAndCols.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                let currentStrick = 0;
                for (let indexDelta = 0; indexDelta < this.cellsForWin + 1; indexDelta++) {
                    const rowShiftedIndex = rowIndex + indexDelta;
                    const columnShiftedIndex = columnIndex + indexDelta;

                    if (this.isCellExistsOnField(rowShiftedIndex, columnShiftedIndex)
                        && this.gameFieldWithRowAndCols[rowShiftedIndex][columnShiftedIndex] === currentSymbol) {
                        currentStrick++;
                    }

                    if (currentStrick === this.cellsForWin) {
                        return true
                    }
                }
            }
        }
        return false
    }

    isWinOnSecondaryDiagonal(currentSymbol: string) {
        for (let rowIndex = 0; rowIndex < this.gameFieldWithRowAndCols.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.gameFieldWithRowAndCols[rowIndex].length; columnIndex++) {
                let currentStrick = 0;
                for (let indexDelta = 0; indexDelta < this.cellsForWin + 1; indexDelta++) {
                    const rowShiftedIndex = rowIndex + indexDelta;
                    const columnShiftedIndex = columnIndex - indexDelta;
                    
                    if (this.isCellExistsOnField(columnShiftedIndex, rowShiftedIndex)
                        && this.gameFieldWithRowAndCols[columnShiftedIndex][rowShiftedIndex] === currentSymbol) {
                        currentStrick++;
                    }

                    if (currentStrick === this.cellsForWin) {
                        return true
                    }
                    
                }
            }
        }
        return false
    }

    isCellExistsOnField(firstIndex: number, secondIndex: number): boolean {
        return (
            this.gameFieldWithRowAndCols[firstIndex] !== undefined 
            && this.gameFieldWithRowAndCols[firstIndex][secondIndex] !== undefined
        );
    }

    generateFieldWithRowAndCols(): string[][] {
        this.gameFieldWithRowAndCols = [];
        const rowLimits = [0, this.fieldSize];

        for (let index = 0; index < this.fieldSize; index++) {
            this.gameFieldWithRowAndCols.push([...this.gameField.slice(rowLimits[0], rowLimits[1])]);

            rowLimits[0] += this.fieldSize;
            rowLimits[1] += this.fieldSize;
        }

        return this.gameFieldWithRowAndCols;
    }

    toggleCurrentStepSymbol(): void {
        this.currentStepSymbol = this.currentStepSymbol === this.firstStepSymbol ? this.secondStepSymbol : this.firstStepSymbol;
    }

    makeStep(clickedCellNumber: number): void {
        this.gameField[clickedCellNumber] = this.currentStepSymbol;
    }

    handleGameEnd() {
        if (this.isWinCombination(this.currentStepSymbol) === true) {
            this.gameMessage = `${this.currentStepSymbol} wins`
            this.isGameEnds = true;
        }

        if (this.isAllCellsTaken() === true) {
            this.gameMessage = `Draw`
            this.isGameEnds = true;
        }
    }

    onCellClick(event: MouseEvent): void {
        if(this.isGameEnds === true) {
            return
        }

        const clickedCellNumber = this.getCellNumber(event);

        if(this.isCellTaken(clickedCellNumber) === true) {
            return 
        }
        
        this.makeStep(clickedCellNumber);

        console.log(clickedCellNumber)
        const currentCell = document.getElementById(`cell${clickedCellNumber}`) as HTMLElement;
        console.log(currentCell)

        this.handleGameEnd() 

        this.toggleCurrentStepSymbol();

        if(!this.isComputerCanStep()) {
            return
        }

        const computerCellIdForStep = this.getRandomCellIdForComputerStep();
        this.makeStep(computerCellIdForStep);

        this.handleGameEnd() 

        this.toggleCurrentStepSymbol();
    }

    onFieldSizeChange(): void {
        if (this.inputValueFieldSize < 3 || this.inputValueFieldSize > 100) {
            this.inputValueFieldSize = this.fieldSize;
            window.alert("must be in range of 3 and 100");
            return
        }

        this.fieldSize = this.inputValueFieldSize;
        
        this.refresh()
    }

    onCellsForWinChange(): void {
        if (this.inputValueCellsForWin < 3 || this.inputValueCellsForWin > this.fieldSize) {
            this.inputValueCellsForWin = this.cellsForWin;
            window.alert(`must be in range of 3 and ${this.fieldSize}`);
            return
        }

        this.cellsForWin = this.inputValueCellsForWin;

        this.refresh()
    }

    on1vs1Click(event: MouseEvent) {
        if (this.is1vs1ClickAvailible === false) {
            return
        }

        const clickedButton: HTMLElement = event.target as HTMLElement;
        const opositeButton: HTMLElement = document.getElementById("1vsPcButton") as HTMLElement;
        opositeButton.classList.remove("game-button_disable");
        clickedButton.classList.add("game-button_disable")

        this.isGameVsComputer = false;
        this.is1vs1ClickAvailible = false;
        this.is1vsPcClickAvailible = true;
        
        this.refresh()
    }

    on1vsPcClick(event: MouseEvent) {
        if (this.is1vsPcClickAvailible === false) {
            return
        }

        const clickedButton: HTMLElement = event.target as HTMLElement;
        const opositeButton: HTMLElement = document.getElementById("1vs1Button") as HTMLElement;
        opositeButton.classList.remove("game-button_disable");
        clickedButton.classList.add("game-button_disable")

        this.isGameVsComputer = true;
        this.is1vs1ClickAvailible = true;
        this.is1vsPcClickAvailible = false;

        this.refresh()
    }
}