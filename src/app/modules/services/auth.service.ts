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

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  ngOnInit(): void {}
  constructor(private readonly httpClient: HttpClient) {
    this.userDataSubject.subscribe((result) => {
      if (
        this.checkIfTokenIsValid() === TOKEN_VALIDATION_STATES.VALID &&
        result === this.initialUserData
      ) {
        const token = localStorage.getItem('authToken');
        const decoded = token ? jwtDecode(token) : '';
        this.userDataSubject.next(decoded as UserInterface);
      }
      if (result !== this.initialUserData) {
        this.finalUserData = result;
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

  finalUserData!: UserInterface;

  mockExpiredJwt = jwtDecode(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJpYXQiOjE2OTg5NjIyNjAsImV4cCI6MTY5ODk2NTg2MH0.F4G7yBlKKGTAVxGJZqw1qQRKW4fZ4m68qXwovSBybJI'
  );

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
