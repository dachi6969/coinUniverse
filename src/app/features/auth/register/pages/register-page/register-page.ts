import { Component, inject } from '@angular/core';
import { LogoIcon } from "../../../../../shared/icons/logo-icon/logo-icon";
import { AuthInput } from "../../../../../shared/components/auth-input/auth-input";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '../../../../../core/services/auth-services/validation-service';

@Component({
  selector: 'app-register-page',
  imports: [ LogoIcon, AuthInput, ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {

  private validationService = inject(ValidationService);

  public form = new FormGroup({
    username: new FormControl('', [
      this.validationService.required,
      this.validationService.usernameValidation
    ]),
    lastname: new FormControl('', [
      this.validationService.required,
      this.validationService.usernameValidation
    ]),
    email: new FormControl('', [
      this.validationService.required,
      this.validationService.emailValidation
    ]),
    number: new FormControl('', [
      this.validationService.required,
      this.validationService.numberValidation
    ]),
    password: new FormControl('', [
      this.validationService.required,
      this.validationService.passwordValidation
    ]),
    confirm: new FormControl(''),
  },{
    updateOn: 'submit'
  })

}
