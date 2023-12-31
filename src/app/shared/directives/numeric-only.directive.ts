import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumericOnly]',
  standalone:true
})
export class NumericOnlyDirective {
  @Input() allowDecimal:boolean = false;
  @Input() allowNewLine:boolean = false;
  @Input() prepend88ToNewLines: boolean = false;
  constructor(private el:ElementRef) { }
  @HostListener('input',['$event']) onInput(event:KeyboardEvent)
  {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let inputValue:string = inputElement.value;
    if (!this.allowDecimal) {
      // Allow numbers and newlines
      inputValue = inputValue.replace(/[^0-9\n]/g, '');
    } else {
      // Allow numbers, one decimal point, and newlines
      inputValue = inputValue.replace(/[^0-9.\n]/g, '');
  
      // Ensure only one decimal point
      const decimalCount = inputValue.split('.').length - 1;
      if (decimalCount > 1) {
        inputValue = inputValue.slice(0, inputValue.lastIndexOf('.'));
      }
    }
    if (this.prepend88ToNewLines) {
      inputValue = this.prepend88ToLines(inputValue);
    }
    inputElement.value = inputValue;
  }
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.allowNewLine && (event.key === 'Enter' || event.key === 'Tab' || event.key === ' ')) {
      event.preventDefault();
      const inputElement = this.el.nativeElement as HTMLInputElement;
      inputElement.value += '\n';
    }
  }

  private prepend88ToLines(inputValue: string): string {
    const lines = inputValue.split('\n');

    // Check each line and prepend '88' if it doesn't start with '88'
    const modifiedLines = lines.map((line, index) => {
      return index === 0 && line === '88' ? line : line.startsWith('88') ? line : '88' + line;
    });

    return modifiedLines.join('\n');
  }

}
