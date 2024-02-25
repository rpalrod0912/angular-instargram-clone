import { Component, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs';
import { PostInterface } from 'src/app/modules/interfaces/post.interface';
import { AuthService } from 'src/app/modules/services/auth.service';
import { GeneralService } from 'src/app/modules/services/general.service';
import { PostService } from 'src/app/modules/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts!: PostInterface[];

  constructor(
    private readonly authService: AuthService,
    private readonly postService: PostService,
    private readonly generalService: GeneralService
  ) {
    this.authService.getUpdatedUserData(
      this.authService.finalUserData.id.toString()
    );
    this.authService.userDataSubject.subscribe((result) => {
      console.log('changes in home');
    });
  }

  ngOnInit(): void {
    //First 10 Home Page posts load
    this.postService
      .getHomePosts(0)
      .pipe(shareReplay(1))
      .subscribe((posts) => {
        if (posts.length > 0) {
          posts.forEach((post: PostInterface, index: number) => {
            post.imageDecoded = this.generalService.decodeBase64Image(
              post.image
            );
          });
          this.posts = posts;
          console.log(posts);
        }
      });
  }
}
