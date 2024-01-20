import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { MessageService } from 'primeng/api';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  imports: [SharedModule, DashboardRoutingModule, CommonModule],
  providers: [MessageService],
})
export class DashboardModule {}
