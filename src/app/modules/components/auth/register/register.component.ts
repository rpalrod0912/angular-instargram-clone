import { IfStmt, ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { AUTH_ERRORS } from 'src/app/modules/constants/httpErrors.constants';
import {
  emailTakenErrorMessage,
  emailTakenErrorToast,
  errorMessageToast,
  userTakenErrorMessage,
  userTakenErrorToast,
} from 'src/app/modules/constants/primeNg.constant';
import { AuthService } from 'src/app/modules/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formGroup!: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly messageService: MessageService
  ) {}

  emailInvalidMessage = {
    messageObject: emailTakenErrorMessage,
    state: false,
  };

  userInvalidMessage = {
    messageObject: userTakenErrorMessage,
    state: false,
  };

  ngOnInit(): void {
    this.setForm();
  }

  //Register User
  onSubmit() {
    const registerData = {
      username: this.formGroup.get('username')?.value,
      password: this.formGroup.get('password')?.value,
      email: this.formGroup.get('email')?.value,
    };

    this.emailInvalidMessage.state = false;
    this.userInvalidMessage.state = false;
    this.authService.userRegister(registerData).subscribe(
      (response) => {
        if (response.status === 200) {
          // this.showErrorMessage = false;
          this.resetForm();
          localStorage.setItem('authToken', response.body.token);
        }
      },
      (error) => {
        if (error.status === 400) {
          if (error.error === AUTH_ERRORS.REGISTER.EMAIL_TAKEN) {
            this.emailInvalidMessage.state = true;
          } else if (error.error === AUTH_ERRORS.REGISTER.USERNAME_TAKEN) {
            this.userInvalidMessage.state = true;
          }
        } else {
          console.error('HTTP request error:', error);
        }
      }
    );
  }

  private resetForm() {
    this.formGroup.get('username')?.setValue('');
    this.formGroup.get('password')?.setValue('');
    this.formGroup.get('email')?.setValue('');
    this.formGroup.get('confirmPassword')?.setValue('');
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();
  }

  //Only for show to the user dinamicly if password confirmation doesn't matches, doesn't affect to the form validation really
  checkPasswordMatches() {
    const password = this.formGroup?.get('password')?.value;

    const confirmPassword: string =
      this.formGroup?.get('confirmPassword')?.value;
    if (confirmPassword.length > 0 && confirmPassword !== password) {
      this.formGroup
        ?.get('confirmPassword')
        ?.setErrors({ passwordNotMatch: true });
      return true;
    } else if (
      confirmPassword === password &&
      this.formGroup?.get('confirmPassword')?.getError('passwordNotMatch')
    ) {
      this.formGroup
        ?.get('confirmPassword')
        ?.setErrors({ passwordNotMatch: false });
      console.log(this.formGroup?.get('confirmPassword'));
    }
    return false;
  }

  //Makes the form invalid if password doesn't matches however doesn't add ng-valid style class to confirmation password input
  confirmPasswordValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null; // Passwords match
    } else {
      return { passwordMismatch: true }; // Passwords do not match
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    console.log(control);
    // Define regular expressions for uppercase letter and number checks
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;

    // Check if the password contains at least one uppercase letter and one number
    if (uppercaseRegex.test(password) && numberRegex.test(password)) {
      return null; // Password is valid
    } else {
      return { passwordRequirements: true }; // Password does not meet requirements
    }
  }

  private setForm() {
    this.formGroup = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.passwordValidator]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.confirmPasswordValidator, // Apply the custom validator function
      }
    );
  }
}
