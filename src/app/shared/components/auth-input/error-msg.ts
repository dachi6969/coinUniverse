export const errorMsgs: any = {
    required: 'This field is required.',
    minlength: (e: any) =>  `Must be at least ${e.requiredLength} symbol`,
    email: 'Enter valid email format.',
    missMatch: 'Passwords do not match.',
    invalidNumFormat: 'Invalid format.',
    noNum: 'Must contain at least one number.',
    upperCase: 'Must contain at least one uppercase letter.',
    infoMatched: (e: any) => `This ${e.fieldName} is already registered.`,
}