import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { API_ENDPOINTS } from '../constants/endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  // loginStatus=

  ngOnInit(): void {}
  constructor(private readonly httpClient: HttpClient) {}

  getUserData(id: string) {
    const url = API_ENDPOINTS.USER.GET_USER_DATA.replace(':id', id.toString());
    return this.httpClient.get<any>(url, {
      observe: 'response',
    });
  }

  uploadUserProfileImage(formData: any) {
    return this.httpClient.post<any>(
      API_ENDPOINTS.UPLOAD_FILE.UPLOAD_USER_IMAGE,
      formData
    );
  }

  getUserProfileImage(userId: string) {
    const newUrl = API_ENDPOINTS.UPLOAD_FILE.GET_USER_IMAGE.replace(
      ':id',
      userId
    );
    // return this.httpClient.get<any>(newUrl);
    return newUrl;
  }
}
