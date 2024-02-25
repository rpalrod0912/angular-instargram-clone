import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { API_ENDPOINTS } from '../constants/endpoints.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostInterface } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService implements OnInit {
  userPostsSubject: BehaviorSubject<PostInterface[]>;

  constructor(private readonly httpClient: HttpClient) {
    this.userPostsSubject = new BehaviorSubject<PostInterface[]>([]);
  }

  ngOnInit(): void {}

  getUserPosts(id: number) {
    const url = API_ENDPOINTS.POSTS.GET_USER_POSTS.replace(
      ':id',
      id.toString()
    );
    this.httpClient.get<PostInterface[]>(url).subscribe((result) => {
      this.userPostsSubject.next(result);
    });
  }

  getHomePosts(page: number): Observable<PostInterface[]> {
    const url = API_ENDPOINTS.POSTS.GET_ALL_POST;
    return this.httpClient.get<PostInterface[]>(url, {
      params: {
        page,
        limit: 10,
      },
    });
  }

  createPost(formData: FormData) {
    return this.httpClient.post<any>(
      API_ENDPOINTS.POSTS.UPLOAD_NEW_POST,
      formData
    );
  }
}
