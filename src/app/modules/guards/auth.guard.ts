import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TOKEN_VALIDATION_STATES } from '../constants/general.constants';
import { AUTH_ROUTES, DASHBOARD_ROUTES } from '../constants/routes.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (
      this.authService.checkIfTokenIsValid() === TOKEN_VALIDATION_STATES.VALID
    ) {
      return true;
    } else {
      this.router.navigate([AUTH_ROUTES.LOGIN]);
      return false;
    }
  }
}
