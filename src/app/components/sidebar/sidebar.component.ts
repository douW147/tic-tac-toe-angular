import { Component, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    @ViewChild('sidebar') sidebar!: ElementRef;

    @Output() newSidebarExpandedEvent = new EventEmitter<boolean>();

    public title = 'Restybrix';

    public sidebarExpanded = false;

    private isMouseDown = false;

    private xStartPosition = 0;
    private xDelta = 0;

    private pixelsToExecuteEndingAnimation = 150;
    private minimumPixelsForAnimation = 50;

    private sidebarAnimationMargin = 70;
    private sidebarAnimationWidth = 300;

    constructor(private el: ElementRef) {}

    @HostListener('window:resize', ['$event'])
    private onResize(): void {
        this.getExpandIconName();

        this.newSidebarExpandedEvent.emit(this.sidebarExpanded);
    }

    @HostListener('document:mouseup', ['$event'])
    private mouseUp(): void {
        this.handleSidebarMovementOnRelease();
    }

    @HostListener('window:touchend', ['$event'])
    private touchEnd(): void {
        this.handleSidebarMovementOnRelease();
    }

    @HostListener('window:mousedown', ['$event'])
    private mouseDown(): void {
        this.isMouseDown = true;
        this.xStartPosition = (event as MouseEvent).screenX;
    }

    @HostListener('document:touchstart', ['$event'])
    private touchStart(): void {
        this.isMouseDown = true;
        this.xStartPosition = (event as TouchEvent).touches[0].clientX;
    }

    @HostListener('window:mousemove', ['$event'])
    private mouseMove(): void {
        if (!this.isAbleToMove()) {
            return;
        }   

        const xCurrentPosition = (event as MouseEvent).screenX;
        this.xDelta = xCurrentPosition - this.xStartPosition;

        this.handleSidebarMovement();
    }

    @HostListener('window:touchmove', ['$event'])
    private touchMove(): void {
        if (!this.isAbleToMove()) {
            return;
        }      

        const xCurrentPosition = (event as TouchEvent).touches[0].clientX;
        this.xDelta = xCurrentPosition - this.xStartPosition;

        this.handleSidebarMovement();
    }

    private handleSidebarMovement(): void {
        this.handleExpand();
        this.handleClosing();
    }

    private handleSidebarMovementOnRelease(): void {
        this.isMouseDown = false;
        this.xStartPosition = 0;
        this.setSidebarDefaultStyles();

        if (this.xDelta > this.pixelsToExecuteEndingAnimation) {
            this.sidebarExpanded = true;
        } else if (this.xDelta < - this.pixelsToExecuteEndingAnimation) {
            this.sidebarExpanded = false;
        }
        
        this.xDelta = 0;
    }

    private handleExpand(): void  {
        if (this.xDelta < this.minimumPixelsForAnimation || this.sidebarExpanded) return;
        
        if (this.xDelta < this.sidebarAnimationMargin) {
            this.sidebar.nativeElement.style.marginLeft = `${this.xDelta - this.sidebarAnimationMargin}px`;
        } else {
            this.sidebar.nativeElement.style.marginLeft = '0px';
            this.sidebar.nativeElement.style.width = `${this.xDelta}px`;
        }
    }

    private handleClosing(): void  {
        if (!(this.xDelta < 0 && this.sidebarExpanded)) return;

        this.sidebar.nativeElement.style.width = `${this.sidebarAnimationWidth + this.xDelta}px`;
    }

    private setSidebarDefaultStyles(): void  {
        this.sidebar.nativeElement.style.marginLeft = '';
        this.sidebar.nativeElement.style.width = '';
    }

    private isAbleToMove(): boolean {
        if (window.getSelection()?.toString() !== '' 
            || !this.isMouseDown
            || !this.isNarrowScreen()) return false;

        return true;
    }

    private isNarrowScreen(): boolean {
        const narrowScreenWidth = 720;

        return window.innerWidth < narrowScreenWidth;
    }

    public toggleSidebarExpanded(): void {
        this.sidebarExpanded = !this.sidebarExpanded;

        this.newSidebarExpandedEvent.emit(this.sidebarExpanded);
    }

    public rotateAnimationAvailable(): boolean {
        if (this.isNarrowScreen()) {
           return false;
        }

        return this.sidebarExpanded;
    }

    public getExpandIconName(): string {
        if (this.isNarrowScreen()) {
            return 'lunch_dining_icon';
        }

        return 'arrow_forward_ios';
    }

    public backdropClick(): void {
        this.sidebarExpanded = false;
    }

    public isBackDropActive(): boolean {
        if (this.isNarrowScreen() && this.sidebarExpanded) {
            return true;
        }

        return false;
    }
}
