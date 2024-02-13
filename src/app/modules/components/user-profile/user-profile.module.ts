import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MessageService } from 'primeng/api';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserConfigurationComponent } from './components/user-configuration/user-configuration.component';
import { EditUserImageComponent } from './components/edit-user-image/edit-user-image.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserConfigurationComponent,
    EditUserImageComponent,
  ],
  exports: [
    UserProfileComponent,
    UserConfigurationComponent,
    EditUserImageComponent,
  ],
  imports: [SharedModule, UserProfileRoutingModule, CommonModule],
  providers: [MessageService],
})
export class UserProfileModule {}
