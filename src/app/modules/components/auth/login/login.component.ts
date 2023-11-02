import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { errorMessage } from 'src/app/modules/constants/primeNg.constant';
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
    private readonly userService: UserService
  ) {}

  errorMessage: Message[] = errorMessage;
  showErrorMessage: boolean = false;

  ngOnInit(): void {
    this.setForm();
  }

  onSubmit() {
    const loginData = { ...this.formGroup.value };
    const response = this.authService.userLogin(loginData).subscribe(
      (response) => {
        if (response.status === 200) {
          this.showErrorMessage = false;
          this.resetForm();
          localStorage.setItem('authToken', response.body.token);
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
        } else {
          console.error('HTTP request error:', error);
        }
      }
    );
  }

  fetchUserData(id: string) {
    this.userService.getUserData(id).subscribe((result) => {
      console.log(result);
    });
  }

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
