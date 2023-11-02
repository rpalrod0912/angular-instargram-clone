import { Component, Input } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-pop-up-message',
  templateUrl: './pop-up-message.component.html',
  styleUrls: ['./pop-up-message.component.scss'],
})
export class PopUpMessageComponent {
  @Input() messages!: Message[];
}
