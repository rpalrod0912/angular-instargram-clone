import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ROUTES, Router } from '@angular/router';
import { DASHBOARD_ROUTES } from 'src/app/modules/constants/routes.constants';

export const optionsConstants = [
  {
    text: 'Home',
    icon: 'pi pi-home',
    routerLink: '',
  },
  {
    text: 'Profile',
    icon: 'pi pi-user',
    routerLink: DASHBOARD_ROUTES.USER,
  },
  {
    text: 'New Post',
    icon: 'pi pi-plus',
    routerLink: DASHBOARD_ROUTES.NEW_POST,
  },
  { text: 'Liked', icon: 'pi pi-heart', routerLink: '' },
];

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss'],
})
export class OptionsMenuComponent {
  @Input() userId!: number;
  @Output() showCreatePost = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  menuOptions = optionsConstants;

  goToRoute(routerLink: string, text: string): void {
    if (text === 'Profile') {
      this.router.navigate([routerLink, this.userId]);
      return;
    } else if (text === 'New Post') {
      this.showCreatePostDialog(true);
      return;
    }
    this.router.navigate([routerLink]);
  }

  //Emit new value to Create Post Dialog for dasbhoard executing new value
  showCreatePostDialog(option: boolean) {
    this.showCreatePost.emit(option);
  }
}
