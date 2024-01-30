import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { decode } from 'jsonwebtoken';
import { take } from 'rxjs';
import { PostInterface } from 'src/app/modules/interfaces/post.interface';
import {
  UserFollowersInterface,
  UserInterface,
} from 'src/app/modules/interfaces/user.interface';
import { AuthService } from 'src/app/modules/services/auth.service';
import { DialogsService } from 'src/app/modules/services/dialogs.service';
import { GeneralService } from 'src/app/modules/services/general.service';
import { PostService } from 'src/app/modules/services/post.service';
import { UserService } from 'src/app/modules/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnDestroy {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly generalService: GeneralService,
    readonly dialogsService: DialogsService
  ) {
    this.authService.userDataSubject.subscribe((result) => {
      console.log('changes in user component');
    });
  }

  loadedStates = {
    userDataLoad: false,
    userFollowersLoad: false,
    userPostsLoad: false,
  };

  userData!: UserInterface;
  userFollowers!: UserFollowersInterface;
  userPosts!: PostInterface[];
  image!: any;

  userPostsSubscription = this.postService.userPostsSubject.subscribe(
    (result) => {
      this.loadedStates.userPostsLoad = false;
      result.forEach((post: PostInterface, index: number) => {
        post.imageDecoded = this.generalService.decodeBase64Image(post.image);
      });
      this.userPosts = result;
      if (this.userPosts) {
        this.loadedStates.userPostsLoad = true;
      }
    }
  );

  userDataSubscription = this.authService.userDataSubject.subscribe(
    (result) => {
      this.loadedStates.userDataLoad = false;

      if (result) {
        this.userData = result;
        this.postService.getUserPosts(this.userData.id);
        this.loadedStates.userDataLoad = true;
      }
    }
  );

  ngOnInit() {
    this.setListeners();
  }

  selectedFile!: File;
  name: string = 'farra';
  userId: string = this.authService.finalUserData.id.toString();

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  openFollowerDialog(dialogType: string) {
    this.dialogsService.unvealNewContainer(
      this.dialogsService.followerDialogConstants.containerClass,
      this.dialogsService.followerDialogConstants.newClass,
      dialogType
    );
  }

  private setListeners() {
    //Find Last User Data
    this.authService.getUpdatedUserData(
      this.authService.finalUserData.id.toString()
    );

    //GET USER FOLLOWERS FOR DISPLAYING IN PROFILE

    this.userService
      .getUserFollowers(this.userData.id)
      .pipe(take(1))
      .subscribe((result) => {
        this.loadedStates.userFollowersLoad = false;

        if (result) {
          this.userFollowers = result;
          this.loadedStates.userFollowersLoad = true;
        }
        // this.userFollowers=result;
      });

    //GET USER POSTS FOR DISPLAYING IN PROFILE
  }

  ngOnDestroy(): void {
    // Unsubscribe from userPostsSubject
    this.userDataSubscription.unsubscribe();
    this.userDataSubscription.unsubscribe();
  }
}
