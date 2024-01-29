import {
  Component,
  ElementRef,
  EventEmitter,
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
} from 'src/app/modules/constants/primeNg.constant';
import { UserInterface } from 'src/app/modules/interfaces/user.interface';
import { AuthService } from 'src/app/modules/services/auth.service';
import { GeneralService } from 'src/app/modules/services/general.service';
import { PostService } from 'src/app/modules/services/post.service';
import { UserService } from 'src/app/modules/services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Output() closeCreatePost = new EventEmitter<boolean>();

  noUserImage = NO_USER_IMAGE;

  userData!: UserInterface;
  selectedFile!: File;
  formGroup!: FormGroup;
  selectedFilePreview!: string;
  succesContainer = false;

  isLoading = true;

  formSteps: { firstStep: boolean; secondStep: boolean } = {
    firstStep: false,
    secondStep: false,
  };

  items: MenuItem[] | undefined;

  activeIndex: number = 0;

  constructor(
    private readonly fb: FormBuilder,
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    readonly generalService: GeneralService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (this.userService.userData) {
      this.userData = this.userService.userData;
      this.isLoading = false;
    } else {
      this.authService.getUpdatedUserData(
        this.authService.finalUserData.id.toString()
      );

      this.authService.userDataSubject.subscribe((result) => {
        if (result) {
          this.userData = result;
          this.isLoading = false;
        }
      });
    }
    this.setForm();
  }

  openFileInput() {
    // Trigger a click event on the file input element
    this.fileInput.nativeElement.click();
  }

  onSubmit() {
    if (this.selectedFile && this.formGroup.valid && this.userData) {
      const formData = this.createFormDataBody([
        this.selectedFile,
        this.userData.id.toString(),
        this.formGroup.get('content')?.value,
      ]);
      this.isLoading = true;
      this.postService.createPost(formData).subscribe(
        (response) => {
          this.isLoading = false;
          this.messageService.add(createPostSuccessToast);
          this.closeCreatePost.emit(false);
          this.postService.getUserPosts(this.userData.id);
        },
        (error) => {
          console.error('Upload error:', error);
        }
      );
    } else {
      // Handle the case when no file is selected or name is missing
      console.log('Please select a file and provide a name.');
    }
  }

  //Create a Form-Data Body Type Object (For Sending images files and normal data, normal JSON body doesn accept images you need explicit form data)
  createFormDataBody(formDataContent: [File, string, string]): FormData {
    //Old Method (param 1 -> property name (established in backend) ,param 2-> content to send)
    // formData.append('files', this.selectedFile);
    // formData.append('user_id', this.userData.id.toString());
    // formData.append('content', this.formGroup.get('content')?.value);
    const dataTypes = ['files', 'user_id', 'content'];
    const formData = new FormData();
    dataTypes.forEach((string, index) => {
      formData.append(string, formDataContent[index]);
    });

    return formData;
  }

  onFileSelected(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.selectedFilePreview = URL.createObjectURL(this.selectedFile);
  }

  private setForm() {
    this.formGroup = this.fb.group({
      content: ['', [Validators.required]],
    });
  }
}
