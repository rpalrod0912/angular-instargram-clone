import { Component } from '@angular/core';

export const optionsConstants = [
  {
    text: 'Home',
    icon: 'pi pi-home',
  },
  {
    text: 'Profile',
    icon: 'pi pi-user',
  },
  { text: 'Liked', icon: 'pi pi-heart' },
];

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss'],
})
export class OptionsMenuComponent {
  menuOptions = optionsConstants;
}
