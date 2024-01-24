import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { PostInterface } from 'src/app/modules/interfaces/post.interface';
import { GeneralService } from 'src/app/modules/services/general.service';
import { UserService } from 'src/app/modules/services/user.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('true', style({ opacity: 1, display: 'block' })),
      state('false', style({ opacity: 0, display: 'none' })),
      transition('false <=> true', animate('500ms ease-in-out')),
    ]),
  ],
})
export class UserPostComponent implements OnInit {
  @Input() postData!: PostInterface;

  showDiv: boolean = false;
  postOwnerImage!: string | SafeResourceUrl;

  constructor(
    private userService: UserService,
    public generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserProfileImage(this.postData.user_id.toString())
      .subscribe((result) => {
        this.postOwnerImage =
          this.generalService.decodeBase64Image(result.image) ?? null;
      });
  }

  showFullscreenDiv() {
    this.showDiv = true;
  }
}
