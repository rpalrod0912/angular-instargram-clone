import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NO_USER_IMAGE } from 'src/app/modules/constants/general.constants';
import { PostInterface } from 'src/app/modules/interfaces/post.interface';
import { GeneralService } from 'src/app/modules/services/general.service';
import { UserService } from 'src/app/modules/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('true', style({ opacity: 1, display: 'block' })),
      state('false', style({ opacity: 0, display: 'none' })),
      transition('false <=> true', animate('500ms ease-in-out')),
    ]),
  ],
})
export class PostComponent {
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
        console.log(result);
        this.postOwnerImage = result
          ? this.generalService.decodeBase64Image(result.image)
          : NO_USER_IMAGE;
      });
  }

  showFullscreenDiv() {
    this.showDiv = true;
  }
}
