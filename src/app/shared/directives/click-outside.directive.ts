import {
  Directive,
   OnInit,
   OnDestroy,
   Output,
   EventEmitter,
   ElementRef,
   HostListener
} from '@angular/core';



@Directive({
  selector: '[click-outside]'
})
export class ClickOutsideDirective {

  private listening: boolean;

  @Output('onClickOutside') onClickOutside: EventEmitter<Object>;

  constructor(private _elRef: ElementRef) {
    this.listening = true;
    this.onClickOutside = new EventEmitter();
  }

  @HostListener('document:click', ['$event']) clickedOutside(event) {
    // here you can hide your menu
    this.onGlobalClick(event);
  }

  onGlobalClick(event: MouseEvent) {
    if (event instanceof MouseEvent && this.listening === true) {
      if (this.isDescendant(this._elRef.nativeElement, event.target) === true) {
        this.onClickOutside.emit({
          target: (event.target || null),
          value: false
        });
      } else {
        this.onClickOutside.emit({
          target: (event.target || null),
          value: true
        });
      }
    }
  }

  isDescendant(parent, child) {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }

}
