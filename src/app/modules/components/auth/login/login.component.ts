import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { TOKEN_VALIDATION_STATES } from 'src/app/modules/constants/general.constants';
import {
  errorMessage,
  errorMessageToast,
} from 'src/app/modules/constants/primeNg.constant';
import { DASHBOARD_ROUTES } from 'src/app/modules/constants/routes.constants';
import { AuthService } from 'src/app/modules/services/auth.service';
import { UserService } from 'src/app/modules/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    public router: Router
  ) {}

  errorMessage: Message[] = errorMessage;
  showErrorMessage: boolean = false;

  ngOnInit(): void {
    if (
      this.authService.checkIfTokenIsValid() === TOKEN_VALIDATION_STATES.VALID
    ) {
      this.router.navigate([DASHBOARD_ROUTES.HOME]);
    }
    this.setForm();
  }

  //Login User
  onSubmit() {
    const loginData = { ...this.formGroup.value };
    this.authService.userLogin(loginData).subscribe(
      (response) => {
        if (response.status === 200) {
          this.showErrorMessage = false;
          this.resetForm();
          localStorage.setItem('authToken', response.body.token);
          this.authService.userDataSubject.next(response.body);
          this.router.navigate([DASHBOARD_ROUTES.HOME]);
        }
      },
      (error) => {
        if (error.status === 400) {
          this.showErrorMessage = true;

          this.formGroup
            .get('username')
            ?.setErrors({ serverError: 'Invalid username or password' });
          this.formGroup
            .get('password')
            ?.setErrors({ serverError: 'Invalid username or password' });

          //Show message toast
          this.messageService.add(errorMessageToast);
        } else {
          console.error('HTTP request error:', error);
        }
      }
    );
  }

  //TODO: DELETE THIS

  private resetForm() {
    this.formGroup.get('username')?.setValue('');
    this.formGroup.get('password')?.setValue('');
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();
  }

  private setForm() {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
