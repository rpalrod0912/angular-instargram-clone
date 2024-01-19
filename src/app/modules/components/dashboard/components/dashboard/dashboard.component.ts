import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { API_ENDPOINTS } from 'src/app/modules/constants/endpoints.constants';
import { UserInterface } from 'src/app/modules/interfaces/user.interface';
import { AuthService } from 'src/app/modules/services/auth.service';
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
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  userData!: UserInterface;
  image!: any;

  ngOnInit() {
    this.authService.getUpdatedUserData(
      this.authService.finalUserData.id.toString()
    );
    this.setListeners();
  }

  private setListeners() {
    this.authService.userDataSubject.subscribe((result) => {
      if (result) {
        this.userData = result;
        this.userService
          .getUserProfileImage(this.authService.finalUserData.id.toString())
          .subscribe((result) => {
            //Get New Image With Blob Endpoint
            let objectURL = URL.createObjectURL(result);
            this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });
      }
    });
  }
}
