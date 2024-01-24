import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { PopUpMessageComponent } from './components/pop-up-message/pop-up-message.component';
import { MessagesModule } from 'primeng/messages';
import { UserService } from '../services/user.service';
import { ToastModule } from 'primeng/toast';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PrimeIcons } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { OptionsMenuComponent } from './components/options-menu/options-menu.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { UserProfileImageComponent } from './components/user-profile-image/user-profile-image.component';

@NgModule({
  declarations: [
    TextInputComponent,
    PopUpMessageComponent,
    ToastMessageComponent,
    OptionsMenuComponent,
    UserPostComponent,
    UserProfileImageComponent,
  ],
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextareaModule,
    FileUploadModule,
    HttpClientModule,
    ProgressSpinnerModule,
    CommonModule,
    DialogModule,
    ImageModule,
    MessagesModule,
    ButtonModule,
    ToastModule,
    AvatarModule,
  ],
  exports: [
    InputTextModule,
    TextInputComponent,
    ProgressSpinnerModule,
    PopUpMessageComponent,
    FileUploadModule,
    InputTextareaModule,
    FormsModule,
    ImageModule,
    UserPostComponent,
    UserProfileImageComponent,
    DialogModule,
    HttpClientModule,
    MessagesModule,
    CommonModule,
    ToastModule,
    ToastMessageComponent,
    OptionsMenuComponent,
    ReactiveFormsModule,
    ButtonModule,
    AvatarModule,
  ],
  providers: [AuthService, UserService, ToastModule],
})
export class SharedModule {}
