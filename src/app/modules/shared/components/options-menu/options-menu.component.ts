import { Component, Input } from '@angular/core';
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
  { text: 'Liked', icon: 'pi pi-heart', routerLink: '' },
];

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss'],
})
export class OptionsMenuComponent {
  @Input() userId!: number;

  constructor(private router: Router) {}

  menuOptions = optionsConstants;

  goToRoute(routerLink: string, text: string) {
    if (text === 'Profile') {
      debugger;
      this.router.navigate([routerLink, this.userId]);
    }
  }
}
