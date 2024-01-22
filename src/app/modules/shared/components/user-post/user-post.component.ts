import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { PostInterface } from 'src/app/modules/interfaces/post.interface';

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
export class UserPostComponent {
  @Input() postData!: PostInterface;

  showDiv: boolean = false;

  showFullscreenDiv() {
    this.showDiv = true;
  }
}
