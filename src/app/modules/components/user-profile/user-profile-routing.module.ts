import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserConfigurationComponent } from './components/user-configuration/user-configuration.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'config',
        canActivate: [AuthGuard],
        component: UserConfigurationComponent,
      },
      {
        path: 'profile/:id',
        canActivate: [AuthGuard],
        component: UserProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
