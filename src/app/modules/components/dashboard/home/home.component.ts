import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/modules/interfaces/user.interface';
import { AuthService } from 'src/app/modules/services/auth.service';
import { UserService } from 'src/app/modules/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  userData!: UserInterface;
  imagePath!: string;

  ngOnInit() {
    this.authService.getUpdatedUserData(
      this.authService.finalUserData.id.toString()
    );
    this.setListeners();
    this.imagePath = this.userService.getUserProfileImage(
      this.authService.finalUserData.id.toString()
    );
    console.log(
      this.userService.getUserProfileImage(
        this.authService.finalUserData.id.toString()
      )
    );
  }

  private setListeners() {
    this.authService.userDataSubject.subscribe((result) => {
      if (result) {
        this.userData = result;
        console.log(result);
      }
    });
  }
}
