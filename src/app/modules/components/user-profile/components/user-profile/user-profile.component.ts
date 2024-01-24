import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { decode } from 'jsonwebtoken';
import { PostInterface } from 'src/app/modules/interfaces/post.interface';
import {
  UserFollowersInterface,
  UserInterface,
} from 'src/app/modules/interfaces/user.interface';
import { AuthService } from 'src/app/modules/services/auth.service';
import { GeneralService } from 'src/app/modules/services/general.service';
import { PostService } from 'src/app/modules/services/post.service';
import { UserService } from 'src/app/modules/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly generalService: GeneralService,

    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  userData!: UserInterface;
  userFollowers!: UserFollowersInterface;
  UserPosts!: PostInterface[];
  userPosts!: PostInterface[];
  image!: any;

  ngOnInit() {
    this.setListeners();
  }

  selectedFile!: File;
  name: string = 'farra';
  userId: string = this.authService.finalUserData.id.toString();

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  private setListeners() {
    //Find Last User Data
    this.authService.getUpdatedUserData(
      this.authService.finalUserData.id.toString()
    );

    this.authService.userDataSubject.subscribe((result) => {
      if (result) {
        this.userData = result;
      }
    });

    //GET USER FOLLOWERS FOR DISPLAYING IN PROFILE

    this.userService.getUserFollowers(this.userData.id).subscribe((result) => {
      if (result) {
        this.userFollowers = result;
      }
      // this.userFollowers=result;
    });

    //GET USER POSTS FOR DISPLAYING IN PROFILE

    this.postService.getUserPosts(this.userData.id).subscribe((result) => {
      if (result) {
        result.forEach((post: PostInterface, index: number) => {
          post.imageDecoded = this.generalService.decodeBase64Image(post.image);
        });
        this.userPosts = result;
      }
    });
  }
}
