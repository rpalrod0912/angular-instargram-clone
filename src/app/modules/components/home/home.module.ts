import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MessageService } from 'primeng/api';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { HomeComponent } from './components/home.component';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [SharedModule, CommonModule, HomeRoutingModule],
  providers: [MessageService],
})
export class HomeModule {}
