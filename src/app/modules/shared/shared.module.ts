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
import { AvatarModule } from 'primeng/avatar';
import { PrimeIcons } from 'primeng/api';
import { OptionsMenuComponent } from './components/options-menu/options-menu.component';
import { UserPostComponent } from './components/user-post/user-post.component';

@NgModule({
  declarations: [
    TextInputComponent,
    PopUpMessageComponent,
    ToastMessageComponent,
    OptionsMenuComponent,
    UserPostComponent,
  ],
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    HttpClientModule,
    CommonModule,
    MessagesModule,
    ButtonModule,
    ToastModule,
    AvatarModule,
  ],
  exports: [
    InputTextModule,
    TextInputComponent,
    PopUpMessageComponent,
    FileUploadModule,
    FormsModule,
    UserPostComponent,
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
