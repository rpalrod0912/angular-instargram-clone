import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PostInterface } from 'src/app/modules/interfaces/post.interface';
import { UserInterface } from 'src/app/modules/interfaces/user.interface';
import { AuthService } from 'src/app/modules/services/auth.service';
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
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  userData!: UserInterface;
  userPosts: PostInterface[] = [
    {
      id: 2,
      user_id: 3,
      image: null,
      content: '',
      created_at: '',
      updated_at: '',
    },
    {
      id: 2,
      user_id: 3,
      image: null,
      content: '',
      created_at: '',
      updated_at: '',
    },
    {
      id: 2,
      user_id: 3,
      image: null,
      content: '',
      created_at: '',
      updated_at: '',
    },
    {
      id: 2,
      user_id: 3,
      image: null,
      content: '',
      created_at: '',
      updated_at: '',
    },
    {
      id: 2,
      user_id: 3,
      image: null,
      content: '',
      created_at: '',
      updated_at: '',
    },
    {
      id: 2,
      user_id: 3,
      image: null,
      content: '',
      created_at: '',
      updated_at: '',
    },
    {
      id: 2,
      user_id: 3,
      image: null,
      content: '',
      created_at: '',
      updated_at: '',
    },
    {
      id: 2,
      user_id: 3,
      image: null,
      content: '',
      created_at: '',
      updated_at: '',
    },
    {
      id: 2,
      user_id: 3,
      image: null,
      content: '',
      created_at: '',
      updated_at: '',
    },
  ];
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
        this.userData = result;
        if (this.userData.image) {
          this.userService
            .getUserProfileImage(this.authService.finalUserData.id.toString())
            .subscribe((result) => {
              //Get New Image With Blob Endpoint
              let objectURL = URL.createObjectURL(result);
              this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            });
        } else {
          this.image = 'assets/img/user.png';
        }
      }
    });
  }
}
