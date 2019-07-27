import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabetonly]'
})
export class AlphabetonlyDirective {

  @Input()
  appAlphabetonly : boolean

  constructor() { }

  @HostListener('keydown', ['$event']) 
  onKeyDown(event) {
    let e = <KeyboardEvent> event;
      if (this.appAlphabetonly) {
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
        if(!(e.keyCode >= 65 && e.keyCode <= 91)) {
          e.preventDefault();
      }
      }
    }
  

}
