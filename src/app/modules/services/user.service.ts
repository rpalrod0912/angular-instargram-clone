import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../constants/endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  getUserData(id: string) {
    const url = API_ENDPOINTS.USER.GET_USER_DATA.replace(':id', id.toString());
    return this.httpClient.get<any>(url, {
      observe: 'response',
    });
  }
}
