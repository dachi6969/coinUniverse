export const errorMsgs: any = {
    required: 'This field is required.',
    minlength: (e: any) =>  `Must be at least ${e.requiredLength} symbol`,
    email: 'Enter valid email format.',
    missMatch: 'Passwords do not match.',
    invalidFormat: 'Invalid format.',
    noNum: 'Must contain at least one number.',
    tooLongNumb: 'Phone number is too long',
    upperCase: 'Must contain at least one uppercase letter.',
    infoMatched: (e: any) => `This ${e.fieldName} is already registered.`,
}