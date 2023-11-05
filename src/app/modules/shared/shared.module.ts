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
import { PrimeIcons } from 'primeng/api';

@NgModule({
  declarations: [
    TextInputComponent,
    PopUpMessageComponent,
    ToastMessageComponent,
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
  ],
  exports: [
    InputTextModule,
    TextInputComponent,
    PopUpMessageComponent,
    FileUploadModule,
    FormsModule,
    HttpClientModule,
    MessagesModule,
    CommonModule,
    ToastModule,
    ToastMessageComponent,
    ReactiveFormsModule,
    ButtonModule,
  ],
  providers: [AuthService, UserService, ToastModule],
})
export class SharedModule {}
