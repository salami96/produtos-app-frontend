import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private uService: UserService
  ) {
    uService.verifyLocalStorage('perfil');
  }

  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  canActivate() {
    if (this.uService.isLogged) {
      return true;
    } else {
      this.router.navigate(['/perfil/entrar']);
    }
  }
}
