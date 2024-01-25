import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { API_ENDPOINTS } from 'src/app/modules/constants/endpoints.constants';
import { UserInterface } from 'src/app/modules/interfaces/user.interface';
import { AuthService } from 'src/app/modules/services/auth.service';
import { GeneralService } from 'src/app/modules/services/general.service';
import { UserService } from 'src/app/modules/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly generalService: GeneralService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  userData!: UserInterface;
  showNewPostDialog: boolean = false;
  image!: any;

  ngOnInit() {
    this.authService.getUpdatedUserData(
      this.authService.finalUserData.id.toString()
    );
    this.authService.userDataSubject.subscribe((result) => {
      console.log('changes in dsahboard');
    });
    this.userData = this.userService.userData;
  }

  //The Function executes when @output from app-options-menu emits new value
  showNewPostModal() {
    this.showNewPostDialog = !this.showNewPostDialog;
  }
}
