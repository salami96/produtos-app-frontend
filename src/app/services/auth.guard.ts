import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private uService: UserService
  ) {}

  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  canActivate() {
    console.log('tentou acessar perfil/');
    if (this.uService.isLogged) {
      console.log('logged is true');
      return true;
    } else {
      console.log('logged is false');
      this.router.navigate(['/perfil/entrar']);
    }
  }
}
