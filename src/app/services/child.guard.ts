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
    if (this.uService.isLogged) {
      this.router.navigate(['/perfil']);
    } else {
      return true;
    }
  }
}
