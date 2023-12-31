import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appNumberValidator]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: NumberValidatorDirective, multi: true }]
})
export class NumberValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return numberValidator()(control);
  }
}

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null; // No validation error if the value is empty
    }

    // Use a regular expression to check if the value consists only of digits and newline characters
    const regex = /^[0-9\n]+$/;
    if (!regex.test(value)) {
      return { 'appNumberValidator': true }; // Validation error if the value contains non-numeric or non-newline characters
    }

    return null; // No validation error
  };
}
