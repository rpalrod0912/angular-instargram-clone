import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FollowerDetail } from 'src/app/modules/interfaces/followers.interface';
import { UserInterface } from 'src/app/modules/interfaces/user.interface';
import {
  DialogsService,
  OpenedModal,
} from 'src/app/modules/services/dialogs.service';
import { GeneralService } from 'src/app/modules/services/general.service';
import { UserService } from 'src/app/modules/services/user.service';

@Component({
  selector: 'app-followers-dialog',
  templateUrl: './followers-dialog.component.html',
  styleUrls: ['./followers-dialog.component.scss'],
})
export class FollowersDialogComponent implements OnInit, OnDestroy {
  @Input() userData!: UserInterface;
  openModal: OpenedModal = { state: false, modalName: 'followersDialog' };

  userFollowersDetail!: FollowerDetail[];
  userFollowedsDetail!: FollowerDetail[];

  modalTitle!: string;
  constructor(
    readonly dialogsService: DialogsService,
    readonly userService: UserService,
    readonly generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.dialogsService.isModalOpened.subscribe((result: OpenedModal) => {
      this.openModal =
        result.modalName === 'followersDialog' ||
        result.modalName === 'followedsDialog'
          ? result
          : this.openModal;
      if (this.openModal && this.openModal.modalName === 'followersDialog') {
        this.modalTitle = 'Followers';

        this.userService
          .getUserFollowersDetail(this.userData.id.toString())
          .subscribe((result) => {
            console.log(result);
            this.userFollowersDetail = result;
          });
      } else if (
        this.openModal &&
        this.openModal.modalName === 'followedsDialog'
      ) {
        this.modalTitle = 'Followeds';
        this.userService
          .getUserFollowedsDetail(this.userData.id.toString())
          .subscribe((result) => {
            console.log(result);
            this.userFollowedsDetail = result;
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.dialogsService.isModalOpened.unsubscribe();
  }

  closeDialog() {
    this.dialogsService.closeContainer(
      this.dialogsService.followerDialogConstants.containerClass,
      this.dialogsService.followerDialogConstants.newClass
    );
    this.openModal = { state: false, modalName: '' };
  }
}
