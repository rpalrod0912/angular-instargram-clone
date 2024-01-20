import { Component, Input } from '@angular/core';
import { PostInterface } from 'src/app/modules/interfaces/post.interface';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss'],
})
export class UserPostComponent {
  @Input() postData!: PostInterface;
}
