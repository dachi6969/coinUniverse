import { Component, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { errorMsgs } from './error-msg';

@Component({
  selector: 'auth-input',
  imports: [],
  templateUrl: './auth-input.html',
  styleUrl: './auth-input.css',
})
export class AuthInput implements ControlValueAccessor {

  typeAs = input<HTMLInputElement['type']>();
  placeHolder = input<string>();
  missMatch = input(false);

  value = signal('');
  disabled = signal<boolean>(false);

  onChange = (value: any) => {};
  onTouched = () => {};

  ngControl = inject(NgControl, { optional: true });

  errorMsg = errorMsgs;
  
  get errorMessages() {
    if (!this.errors) return null;
  
    const key = Object.keys(this.errors)[0];
    const message = this.errorMsg[key];
    const errorValue = this.errors[key];

    return typeof message === 'function'  
      ? message(errorValue)
      : message;
  }
  
  constructor() {
    if ( this.ngControl && this.ngControl !== null ) {
      this.ngControl.valueAccessor = this;
    }
  }

  get errors () {
    if ( this.ngControl === null ) return null;
    
    if ( 
      this.ngControl.touched &&
      this.ngControl.dirty &&
      this.ngControl.invalid
      ) {
      return this.ngControl.errors
    }
    if (this.missMatch()) return { missMatch: true }
    return null
  }

  writeValue(value: any): void {
    this.value.set(value);
  };
  registerOnChange(fn: any): void {
    this.onChange = fn;
  };
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  };

  handleChange(event: any) {
    const val = event.target.value;
    this.value.set(val);
    this.onChange(val);
  }

  onBlur() {
    this.onTouched()
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

}
