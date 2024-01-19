import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MessageService } from 'primeng/api';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserConfigurationComponent } from './components/user-configuration/user-configuration.component';

@NgModule({
  declarations: [UserProfileComponent, UserConfigurationComponent],
  exports: [UserProfileComponent, UserConfigurationComponent],
  imports: [SharedModule, UserProfileRoutingModule, CommonModule],
  providers: [MessageService],
})
export class UserProfileModule {}
