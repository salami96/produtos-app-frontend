import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChildGuard implements CanActivate {

  constructor(
    private router: Router,
    private uService: UserService
  ) {}

  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  canActivate() {
    console.log('tentou acessar login');
    if (this.uService.isLogged) {
      console.log('logged is true - child');
      this.router.navigate(['/perfil']);
    } else {
      console.log('logged is false - child');
      return true;
    }
  }
}
