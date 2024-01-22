import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { API_ENDPOINTS } from '../constants/endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class PostService implements OnInit {
  ngOnInit(): void {}
  constructor(private readonly httpClient: HttpClient) {}

  getUserPosts(id: number) {
    const url = API_ENDPOINTS.POSTS.GET_USER_POSTS.replace(
      ':id',
      id.toString()
    );
    return this.httpClient.get<any>(url);
  }
}
