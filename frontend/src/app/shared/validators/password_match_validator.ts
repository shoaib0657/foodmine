import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export const PasswordsMatchValidator = (passwordControlName: string, confirmPasswordControlName: string): ValidatorFn => {
    const validator = (form: AbstractControl): ValidationErrors | null => {
        const passwordControl = form.get(passwordControlName);
        const confirmPasswordControl = form.get(confirmPasswordControlName);

        if(!passwordControl || !confirmPasswordControl) return null; 
        if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ notMatch: true });
            return { notMatch: true };
        }else {
            const errors = confirmPasswordControl.errors;
            if(!errors) return null;

            delete errors.notMatch;
            confirmPasswordControl.setErrors(errors);
            return null;
        }
    }

    return validator;
}

// import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// export const PasswordsMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
//     const passwordControl = form.get('password');
//     const confirmPasswordControl = form.get('confirmPassword');

//     if (!passwordControl || !confirmPasswordControl) return null;

//     if (passwordControl.value !== confirmPasswordControl.value) {
//         confirmPasswordControl.setErrors({ notMatch: true });
//         return { notMatch: true };
//     } else {
//         const errors = confirmPasswordControl.errors;
//         if (!errors) return null;

//         delete errors.notMatch;
//         confirmPasswordControl.setErrors(errors);
//         return null;
//     }
// };