import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile-image',
  templateUrl: './user-profile-image.component.html',
  styleUrls: ['./user-profile-image.component.scss'],
})
export class UserProfileImageComponent {
  @Input() userImage: any = 'assets/img/user.png';
}
