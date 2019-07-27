import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberonly]'
})
export class NumberonlyDirective {

  @Input()
  appNumberonly : boolean

  constructor() { }

  @HostListener('keydown', ['$event']) 
  onKeyDown(event) {
    let e = <KeyboardEvent> event;
      if (this.appNumberonly) {
      if ([8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
         
          return;
        }
        
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || ((e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))) {
          e.preventDefault();
      }

      }
    }

}
