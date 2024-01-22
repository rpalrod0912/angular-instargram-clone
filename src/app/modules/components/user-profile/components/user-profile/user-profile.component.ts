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
  // [
  //   {
  //     id: 2,
  //     user_id: 3,
  //     image: null,
  //     content: '',
  //     created_at: '',
  //     updated_at: '',
  //   },
  //   {
  //     id: 2,
  //     user_id: 3,
  //     image: null,
  //     content: '',
  //     created_at: '',
  //     updated_at: '',
  //   },
  //   {
  //     id: 2,
  //     user_id: 3,
  //     image: null,
  //     content: '',
  //     created_at: '',
  //     updated_at: '',
  //   },
  //   {
  //     id: 2,
  //     user_id: 3,
  //     image: null,
  //     content: '',
  //     created_at: '',
  //     updated_at: '',
  //   },
  //   {
  //     id: 2,
  //     user_id: 3,
  //     image: null,
  //     content: '',
  //     created_at: '',
  //     updated_at: '',
  //   },
  //   {
  //     id: 2,
  //     user_id: 3,
  //     image: null,
  //     content: '',
  //     created_at: '',
  //     updated_at: '',
  //   },
  //   {
  //     id: 2,
  //     user_id: 3,
  //     image: null,
  //     content: '',
  //     created_at: '',
  //     updated_at: '',
  //   },
  //   {
  //     id: 2,
  //     user_id: 3,
  //     image: null,
  //     content: '',
  //     created_at: '',
  //     updated_at: '',
  //   },
  //   {
  //     id: 2,
  //     user_id: 3,
  //     image: null,
  //     content: '',
  //     created_at: '',
  //     updated_at: '',
  //   },
  // ];
  image!: any;

  ngOnInit() {
    this.authService.getUpdatedUserData(
      this.authService.finalUserData.id.toString()
    );
    this.setListeners();
  }

  selectedFile!: File;
  name: string = 'farra';
  userId: string = this.authService.finalUserData.id.toString();

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  private setListeners() {
    this.authService.userDataSubject.subscribe((result) => {
      if (result) {
        console.log(result);
        this.userData = result;

        //GET USER FOLLOWERS FOR DISPLAYING IN PROFILE
        this.userService
          .getUserFollowers(this.userData.id)
          .subscribe((result) => {
            if (result) {
              this.userFollowers = result;
            }
            // this.userFollowers=result;
          });

        //GET USER POSTS FOR DISPLAYING IN PROFILE
        this.postService.getUserPosts(this.userData.id).subscribe((result) => {
          if (result) {
            console.log(result);
            result.forEach((post: PostInterface, index: number) => {
              post.imageDecoded = this.generalService.decodeBase64Image(
                post.image
              );
            });
            this.userPosts = result;
            console.log(this.userPosts);
          }
        });

        if (this.userData.image) {
          this.image = this.sanitizer.bypassSecurityTrustResourceUrl(
            'data:image/jpg;base64,' + this.userData.image
          );
          //Get New Image With Blob Endpoint
          // let objectURL = URL.createObjectURL(result);
          // this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          //Other way to obtain image+ user data
        } else {
          this.image = 'assets/img/user.png';
        }
      }
    });
  }
}
