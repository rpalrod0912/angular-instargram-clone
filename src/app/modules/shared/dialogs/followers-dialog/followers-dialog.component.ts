import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FollowerDetail } from 'src/app/modules/interfaces/followers.interface';
import { UserInterface } from 'src/app/modules/interfaces/user.interface';
import { DialogsService } from 'src/app/modules/services/dialogs.service';
import { GeneralService } from 'src/app/modules/services/general.service';
import { UserService } from 'src/app/modules/services/user.service';

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
  @Input() userData!: UserInterface;
  openModal: boolean = false;
  userFollowersDetail!: FollowerDetail[];

  constructor(
    readonly dialogsService: DialogsService,
    readonly userService: UserService,
    readonly generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.dialogsService.isModalOpened.subscribe((result) => {
      this.openModal = result;
      if (this.openModal) {
        this.userService
          .getUserFollowersDetail(this.userData.id.toString())
          .subscribe((result) => {
            console.log(result);
            this.userFollowersDetail = result;
          });
      }
    });
  }
}
