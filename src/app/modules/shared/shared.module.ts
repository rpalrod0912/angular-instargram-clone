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

@NgModule({
  declarations: [TextInputComponent, PopUpMessageComponent],
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MessagesModule,
    ButtonModule,
  ],
  exports: [
    InputTextModule,
    TextInputComponent,
    PopUpMessageComponent,
    FormsModule,
    HttpClientModule,
    MessagesModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  providers: [AuthService, UserService],
})
export class SharedModule {}
