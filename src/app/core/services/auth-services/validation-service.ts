import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

type ValidatorsType = ValidationErrors | null;

@Injectable({
  providedIn: 'root',
})
export class ValidationService {

  // required 

  static required(control: AbstractControl):ValidatorsType {
    const value = control.value?.trim();

    const errors: any = {};
    
    if ( value === '' ) {
      errors.required = true;
    }

    return Object.keys(errors).length ? errors : null;
  }
  
    // username 

  static usernameValidation(control: AbstractControl):ValidatorsType {
    const value = control.value?.trim();

    if ( !value ) return null;

    const errors: any = {};

    const isValidUsername = /^[A-Za-z]+$/.test(value);
    
    if ( value.length < 2 ) {
      errors.minlength = {
        requiredLength: 2,
        actualLength: value.length
      }
    };

    if ( !isValidUsername ) {
      errors.invalidFormat = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

    // email

  static emailValidation(control: AbstractControl): ValidatorsType {
      const value = control.value?.trim();
    
      if (!value) return null;
    
      const errors: any = {};
    
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    
      if (!emailRegex.test(value)) {
        errors.email = true;
      }
    
      return Object.keys(errors).length ? errors : null;
  }

      // number 

  static numberValidation(control: AbstractControl):ValidatorsType {
        const value = control.value;
  
        if ( !value ) return null;
      
        const error: any = {};
  
        const num = Number(value);
        const hasMinLength = value.length >= 9;
        const tooLongNumb = value.length > 9;
      
        if ( Number.isNaN(num) ) {
          error.invalidFormat = true;
        }
        else if ( !hasMinLength ) {
          error.minlength = {
            requiredLength: 9,
        }}
        else if ( tooLongNumb ) {
          error.tooLongNumb = true;
        }
        return Object.keys(error).length ? error : null;
  }

    // password 

    static passwordValidation(control: AbstractControl):ValidatorsType {
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
