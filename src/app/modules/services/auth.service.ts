import {
  HttpClient,
  HttpClientModule,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { API_ENDPOINTS } from '../constants/endpoints.constants';
import { jwtDecode } from 'jwt-decode';
import { TOKEN_VALIDATION_STATES } from '../constants/general.constants';
import { UserInterface } from '../interfaces/user.interface';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AUTH_ROUTES } from '../constants/routes.constants';
import { UserService } from './user.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  ngOnInit(): void {}
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly generalService: GeneralService
  ) {
    this.userDataSubject.subscribe((result: UserInterface) => {
      if (
        this.checkIfTokenIsValid() === TOKEN_VALIDATION_STATES.VALID &&
        result === this.initialUserData
      ) {
        const token = localStorage.getItem('authToken');
        const decoded: any = token ? jwtDecode(token) : '';
        this.userDataSubject.next(decoded as UserInterface);
      }
      if (result !== this.initialUserData) {
        this.finalUserData = result;

        this.userService.userData = this.finalUserData;
      }
    });
  }

  initialUserData: UserInterface = {
    created_at: '',
    email: '',
    id: 0,
    image: null,
    password: '',
    token: '',
    updated_at: '',
    username: '',
  };

  userDataSubject = new BehaviorSubject(this.initialUserData);
  userDataObservable = this.userDataSubject.asObservable();

  finalUserData!: UserInterface;

  getUpdatedUserData(userId: string) {
    const isUserAuthValid = this.checkIfTokenIsValid();
    if (isUserAuthValid === TOKEN_VALIDATION_STATES.VALID) {
      const newUrl = API_ENDPOINTS.USER.GET_USER_DATA.replace(':id', userId);
      this.httpClient
        .get<any>(newUrl, {
          observe: 'response',
        })
        .subscribe(
          (result) => {
            if (result.status === 200) {
              const userDataRespone: UserInterface = result.body[0];
              //Decode Image, Ready to use image in Html
              userDataRespone.imageDecoded =
                this.generalService.decodeBase64Image(
                  userDataRespone.image ?? ''
                );
              this.userDataSubject.next(result.body[0]);
            }
          },
          (error) => {
            if (error.status === 400) {
            } else {
              console.error('HTTP request error:', error);
            }
          }
        );
    } else {
      this.router.navigate([AUTH_ROUTES.LOGIN]);
    }
  }

  userLogin(userData: { username: string; password: string }): Observable<any> {
    return this.httpClient.get<UserInterface>(API_ENDPOINTS.AUTH.LOGIN, {
      params: {
        username: userData.username,
        password: userData.password,
      },
      observe: 'response',
    });
  }

  checkIfTokenIsValid(): string {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp && Date.now() < decodedToken.exp * 1000) {
        // Token is not expired
        return TOKEN_VALIDATION_STATES.VALID;
      } else {
        // Token has expired
        console.log('Token has expired.');
        // You may want to handle token expiration, such as logging out the user.
        return TOKEN_VALIDATION_STATES.EXPIRED;
      }
    } else {
      // Token is not found in local storage
      console.log('Token not found.');
      // You should handle this case based on your app's logic.
      return TOKEN_VALIDATION_STATES.NOT_FOUND;
    }
  }

  userRegister(userRegister: {
    username: string;
    password: string;
    email: string;
  }) {
    return this.httpClient.post<any>(
      API_ENDPOINTS.AUTH.REGISTER,
      userRegister,
      {
        observe: 'response',
      }
    );
  }
}
