import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DialogsService } from 'src/app/modules/services/dialogs.service';

@Component({
  selector: 'app-followers-dialog',
  templateUrl: './followers-dialog.component.html',
  styleUrls: ['./followers-dialog.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('true', style({ opacity: 1, display: 'block' })),
      state('false', style({ opacity: 0, display: 'none' })),
      transition('false <=> true', animate('500ms ease-in-out')),
    ]),
  ],
})
export class FollowersDialogComponent implements OnInit {
  openModal: boolean = false;

  constructor(readonly dialogsService: DialogsService) {}

  ngOnInit(): void {
    this.dialogsService.isModalOpened.subscribe((result) => {
      this.openModal = result;
    });
  }
}
