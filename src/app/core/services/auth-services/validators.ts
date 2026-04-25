import { ValidationService } from "./validation-service";

export const REQUIRED_VALIDATOR = [
    ValidationService.required
];
export const EMAIL_VALIDATOR = [
    ValidationService.required,
    ValidationService.emailValidation
];
export const NUMBER_VALIDATOR = [
    ValidationService.required,
    ValidationService.numberValidation
];
export const USERNAME_VALIDATOR = [
    ValidationService.required,
    ValidationService.usernameValidation
];
export const PASSWORD_VALIDATOR = [
    ValidationService.required,
    ValidationService.passwordValidation
];