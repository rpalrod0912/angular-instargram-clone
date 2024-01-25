import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private readonly authService: AuthService) {
    this.authService.getUpdatedUserData(
      this.authService.finalUserData.id.toString()
    );
    this.authService.userDataSubject.subscribe((result) => {
      console.log('changes in home');
    });
  }
}
