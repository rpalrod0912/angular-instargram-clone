import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/modules/services/auth.service';
import { UserService } from 'src/app/modules/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  selectedFile!: File;
  name: string = 'farra';
  userId: string = this.authService.finalUserData.id.toString();

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile && this.name) {
      const formData = new FormData();
      formData.append('files', this.selectedFile);
      formData.append('userId', this.userId);
      this.userService.uploadUserProfileImage(formData).subscribe(
        (response) => {
          console.log('Upload success:', response);
        },
        (error) => {
          console.error('Upload error:', error);
        }
      );

      // Send the formData to your server using an HTTP request
      // You can use Angular's HttpClient for this purpose.
      // Example:
      // this.httpClient.post('your-upload-endpoint', formData).subscribe(response => {
      //   console.log(response);
      // });
    } else {
      // Handle the case when no file is selected or name is missing
      console.log('Please select a file and provide a name.');
    }
  }
}
