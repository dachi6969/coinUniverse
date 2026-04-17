import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

type ValidatorsType = ValidationErrors | null;

@Injectable({
  providedIn: 'root',
})
export class ValidationService {

  // required 

  required(control: AbstractControl):ValidatorsType {
    const value = control.value?.trim();

    const errors: any = {};
    
    if ( value === '' ) {
      errors.required = true;
    }

    return Object.keys(errors).length ? errors : null;
  }
  
    // username 

  usernameValidation(control: AbstractControl):ValidatorsType {
    const value = control.value?.trim();

    if ( !value ) return null;

    const errors: any = {};
    
    if ( value.length < 2 ) {
      errors.minlength = {
        requiredLength: 2,
        actualLength: value.length
      }
    }

    return Object.keys(errors).length ? errors : null;
  }

    // email

  emailValidation(control: AbstractControl):ValidatorsType {
    const value = control.value?.trim();

    if ( !value ) return null;

    const errors: any = {};
    
    if ( !value.includes("@") || !value.includes(".") ) {
      errors.email = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

      // number 

      numberValidation(control: AbstractControl):ValidatorsType {
        const value = control.value;
  
        if ( !value ) return null;
      
        const error: any = {};
  
        const num = Number(value);
        const hasMinLength = value.length >= 9;
      
        if ( Number.isNaN(num) ) {
          error.invalidNumFormat = true;
        }
        else if ( !hasMinLength ) {
          error.minlength = {
            requiredLength: 9,
        };
      }
        return Object.keys(error).length ? error : null;
      }

    // password 

    passwordValidation(control: AbstractControl):ValidatorsType {
      const value = control.value;

      if ( !value ) return null;
    
      const error: any = {};
    
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasMinLength = value.length >= 8;
    
      if ( !hasUpperCase ) {
        error.upperCase = true;
      }
      else if ( !hasNumber ) {
        error.noNum = true;
      }
      else if ( !hasMinLength ) {
        error.minlength = {
          requiredLength: 8,
          actualLength: value.length
        };
      }
    
      return Object.keys(error).length ? error : null;
    }


}
