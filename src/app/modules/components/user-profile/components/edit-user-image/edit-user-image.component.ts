import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { NO_USER_IMAGE } from 'src/app/modules/constants/general.constants';
import {
  createPostSuccessToast,
  successMessageToast,
  updateUserImageSuccessToast,
} from 'src/app/modules/constants/primeNg.constant';
import { UserInterface } from 'src/app/modules/interfaces/user.interface';
import { AuthService } from 'src/app/modules/services/auth.service';
import {
  DialogsService,
  OpenedModal,
} from 'src/app/modules/services/dialogs.service';
import { GeneralService } from 'src/app/modules/services/general.service';
import { PostService } from 'src/app/modules/services/post.service';
import { UserService } from 'src/app/modules/services/user.service';

@Component({
  selector: 'app-edit-user-image',
  templateUrl: './edit-user-image.component.html',
  styleUrls: ['./edit-user-image.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('true', style({ opacity: 1, display: 'block' })),
      state('false', style({ opacity: 0, display: 'none' })),
      transition('false <=> true', animate('500ms')),
    ]),
  ],
})
export class EditUserImageComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Input() userData!: UserInterface;

  openModal: OpenedModal = { state: false, modalName: 'editUserImageDialog' };

  noUserImage = NO_USER_IMAGE;
  modalTitle!: string;

  selectedFile!: File;
  selectedFilePreview!: string;
  succesContainer = false;

  isLoading = false;

  modalSteps: { firstStep: boolean; secondStep: boolean } = {
    firstStep: false,
    secondStep: false,
  };

  items: MenuItem[] | undefined;

  activeIndex: number = 0;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogsService: DialogsService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    readonly generalService: GeneralService,
    readonly authService: AuthService,

    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.setListeners();
  }

  openFileInput() {
    // Trigger a click event on the file input element
    this.fileInput.nativeElement.click();
  }

  onSubmit() {
    if (this.selectedFile && this.userData) {
      const formData = new FormData();
      formData.append('files', this.selectedFile);
      console.log(formData);
      this.isLoading = true;
      this.userService
        .updateUserImage(formData, this.userData.id.toString())
        .subscribe((response) => {
          this.authService.getUpdatedUserData(this.userData.id.toString());
          this.messageService.add(updateUserImageSuccessToast);
          this.closeDialog();
        });
    }
  }

  onFileSelected(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.selectedFilePreview = URL.createObjectURL(this.selectedFile);
  }

  closeDialog() {
    this.dialogsService.closeContainer(
      this.dialogsService.editUserImageConstants.containerClass,
      this.dialogsService.editUserImageConstants.newClass
    );
    this.openModal = { state: false, modalName: '' };
  }

  private setListeners(): void {
    this.dialogsService.isModalOpened.subscribe((result: OpenedModal) => {
      this.openModal =
        result.modalName === 'editUserImageDialog' ||
        result.modalName === 'editUserImageDialog'
          ? result
          : this.openModal;
      if (
        this.openModal &&
        this.openModal.modalName === 'editUserImageDialog'
      ) {
        this.modalTitle = 'Edit User Image';
      }
    });
  }
}
