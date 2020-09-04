import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object,
    private uService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.uService.user.subscribe(u => this.user = this.uService.userData);
    if (isPlatformBrowser(this.platformID)) {
      document.querySelector('nav').style.setProperty('box-shadow', 'none');
    }
  }

  signOut() {
    this.uService.logout().then(() => {
      this.router.navigate(['/perfil/entrar']);
    });
  }


}
