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
  name: string;
  emailError = false;
  passwordError = false;
  cadEmailError = false;
  cadPasswordError = false;
  cadPassword2Error = false;
  nameError = false;
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
    if (this.uService.user) {
      this.uService.user.subscribe(res => {
        if (res) {
          this.router.navigate(['/perfil']);
        }
      });
    }
  }

  setTab(tab: string) {
    this.tab = tab;
  }

  validate() {
    let valid = true;
    if (!this.validateEmail(this.email)) {
      this.emailError = true;
      valid = false;
    }
    if (this.password.length < 8) {
      this.passwordError = true;
      valid = false;
    }
    return valid;
  }

  validateRegister() {
    let valid = true;
    if (!this.validateEmail(this.cadEmail)) {
      this.cadEmailError = true;
      valid = false;
    }
    if (this.cadPassword.length < 8) {
      this.cadPasswordError = true;
      valid = false;
    }
    if (this.cadPassword2 !== this.cadPassword) {
      this.cadPasswordError = true;
      valid = false;
    }
    if (this.name) {
      this.nameError = true;
      valid = false;
    }
    if (this.phone) {
      this.phoneError = true;
      valid = false;
    }
    return valid;
  }

  validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  signIn() {
    if (this.validate()) {
      this.uService.login('gabriel.zanatto2@gmail.com', 'salami1996');
    }
  }
  signOut() {
    this.uService.logout();
  }

}
