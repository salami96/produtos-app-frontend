import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  tab: string;
  email: string;
  password: string;
  cadEmail: string;
  cadPassword: string;
  cadPassword2: string;
  phone: string;
  emailError = false;
  passwordError = false;
  cadEmailError = false;
  cadPasswordError = false;
  cadPassword2Error = false;
  phoneError = false;

  constructor(
    private uService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.setTab(res.action);
    });
    this.uService.user.subscribe(res => {
      if (res) {
        this.router.navigate(['/perfil']);
      }
    });
  }

  setTab(tab: string) {
    this.tab = tab;
  }

  validate(all = false) {
    let valid = true;
    if (this.validateEmail(this.email)) {
      alert('oi');
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  signIn() {
    if (this.email && this.password) {
      this.uService.login('gabriel.zanatto2@gmail.com', 'salami1996');
    } else {
      this.emailError = true;
      this.passwordError = true;
    }
  }
  signOut() {
    this.uService.logout();
  }

}
