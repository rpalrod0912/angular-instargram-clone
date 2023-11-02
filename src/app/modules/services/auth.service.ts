import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../constants/endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  userLogin(userData: { username: string; password: string }) {
    return this.httpClient.get<any>(API_ENDPOINTS.AUTH.LOGIN, {
      params: {
        username: userData.username,
        password: userData.password,
      },
      observe: 'response',
    });
  }

  userRegister(userRegister: {
    username: string;
    password: string;
    email: string;
  }) {
    return this.httpClient.post<any>(API_ENDPOINTS.AUTH.REGISTER, {
      ...userRegister,
      observe: 'response',
    });
  }
}
