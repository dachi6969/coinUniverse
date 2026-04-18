import { Component, inject } from '@angular/core';
import { AuthInput } from "../../../../../shared/components/auth-input/auth-input";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '../../../../../core/services/auth-services/validation-service';
import { LogoIcon } from "../../../../../shared/icons/logo-icon/logo-icon";

@Component({
  selector: 'app-login-page',
  imports: [AuthInput, ReactiveFormsModule, LogoIcon],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  private validationService = inject(ValidationService);

  public form = new FormGroup({
    email: new FormControl ('', [
      this.validationService.required,
      this.validationService.emailValidation
    ]),
    password: new FormControl ('', [
      this.validationService.required,
      this.validationService.passwordValidation
    ])
  }, {
    updateOn: 'submit'
  })

}
