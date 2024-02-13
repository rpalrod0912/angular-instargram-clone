import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { API_ENDPOINTS } from '../constants/endpoints.constants';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  // loginStatus=

  userData!: UserInterface;

  ngOnInit(): void {}
  constructor(private readonly httpClient: HttpClient) {}

  getUserData(id: string) {
    const url = API_ENDPOINTS.USER.GET_USER_DATA.replace(':id', id.toString());
    return this.httpClient.get<any>(url, {
      observe: 'response',
    });
  }

  getUserFollowers(userId: number) {
    const url = API_ENDPOINTS.FOLLOWERS.GET_USER_FOLLOWERS;
    return this.httpClient.get<any>(url, {
      params: {
        user: userId,
      },
    });
  }

  uploadUserProfileImage(formData: any) {
    return this.httpClient.post<any>(
      API_ENDPOINTS.UPLOAD_FILE.UPLOAD_USER_IMAGE,
      formData
    );
  }

  updateUserImage(formData: any, userId: string) {
    return this.httpClient.put<any>(
      API_ENDPOINTS.USER.UPDATE_IMAGE.replace(':id', userId),
      formData,
      { responseType: 'text' as 'json' }
    );
  }

  // getUserProfileImage(userId: string) {
  //   const newUrl = API_ENDPOINTS.UPLOAD_FILE.GET_USER_IMAGE.replace(
  //     ':id',
  //     userId
  //   );
  //   const httpHeaders = new HttpHeaders().set('Accept', 'image/webp,*/*');
  //   return this.httpClient.get<Blob>(newUrl, {
  //     headers: httpHeaders,
  //     responseType: 'blob' as 'json',
  //   });
  // }

  //New Endpoint to get image data with also user Data
  getUserProfileImage(userId: string) {
    const newUrl = API_ENDPOINTS.UPLOAD_FILE.GET_USER_IMAGE.replace(
      ':id',
      userId
    );
    return this.httpClient.get<any>(newUrl);
  }

  getUserFollowersDetail(userId: string) {
    return this.httpClient.get<any>(
      API_ENDPOINTS.FOLLOWERS.GET_FOLLOWERS_DETAIL,
      {
        params: {
          userId,
        },
      }
    );
  }

  getUserFollowedsDetail(userId: string) {
    return this.httpClient.get<any>(
      API_ENDPOINTS.FOLLOWERS.GET_FOLLOWEDS_DETAIL,
      {
        params: {
          userId,
        },
      }
    );
  }
}
