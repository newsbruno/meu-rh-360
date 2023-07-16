
import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export const matchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
};
