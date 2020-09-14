import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  page: string;
  tab: string;
  email: string;
  password: string;
  cadEmail = '';
  cadPassword = '';
  cadPassword2 = '';
  phone = '';
  name = '';
  emailError = false;
  passwordError = false;
  cadEmailError = false;
  cadPasswordError = false;
  cadPassword2Error = false;
  nameError = false;
  phoneError = false;
  msgError = '';
  loginError: boolean;


  constructor(
    private uService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformID: Object,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      this.route.params.subscribe(res => {
        this.setTab(res.action);
      });
      this.page = this.route.snapshot.queryParamMap.get('origem');
      if (!this.page) {
        this.page = 'perfil';
      }
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
    if (this.password) {
      if (this.password.length < 8) {
        this.passwordError = true;
        valid = false;
      }
    } else {
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
    if (this.cadPassword) {
      if (this.cadPassword.length < 8) {
        this.cadPasswordError = true;
        valid = false;
      }
    } else {
      this.cadPasswordError = true;
      valid = false;
    }
    if (this.cadPassword2 !== this.cadPassword || this.cadPassword2 === '') {
      this.cadPassword2Error = true;
      valid = false;
    }
    if (this.name === '') {
      this.nameError = true;
      valid = false;
    }
    if (this.phone === '') {
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
      this.uService.login(this.email, this.password).then(resp => {
        this.router.navigate(['/' + this.page]);
        this.clear();
      }).catch((e: any) => {
        this.msgError = this.getMessage(e.code);
        this.loginError = true;
        setTimeout(() => {
          this.clear();
        }, 5000);
      });
    }
  }

  save() {
    if (this.validateRegister()) {
      this.uService.save(this.name, this.phone, this.cadEmail, this.cadPassword).then(resp => {
        this.router.navigate(['/' + this.page]);
        this.clear();
      }).catch((e: any) => {
        this.msgError = this.getMessage(e.code);
        this.loginError = true;
        setTimeout(() => {
          this.clear();
        }, 5000);
      });
    }
  }

  googleLogin() {
    this.uService.providerLogin('google').then(resp => {
      this.router.navigate(['/' + this.page]);
      this.clear();
    }).catch((e: any) => {
      console.log(e);
      this.msgError = this.getMessage(e.code);
      this.loginError = true;
      setTimeout(() => {
        this.clear();
      }, 5000);
    });
  }

  signOut() {
    this.uService.logout();
  }

  getMessage(code: string) {
    switch (code) {
      case 'auth/user-not-found':
        return 'Usuário não encontrado 😕';
      case 'auth/wrong-password':
        return 'Senha incorreta 😕';
      case 'auth/email-already-in-use':
        return 'Esse email já está sendo usado 😕';
      case 'auth/invalid-email':
        return 'Email inválido 😕';
      case 'auth/weak-password':
        return 'Senha muito fraca 😕';
      case 'auth/popup-closed-by-user':
        return 'O processo de entrada foi cancelado pelo usuário😕';
      default:
        return 'Não foi possível realizar a ação 😕';
    }
  }

  focus(field: string) {
    document.getElementById(field).focus();
  }

  clear() {
    this.emailError = false;
    this.passwordError = false;
    this.cadEmailError = false;
    this.cadPasswordError = false;
    this.cadPassword2Error = false;
    this.nameError = false;
    this.phoneError = false;
    this.loginError = false;
    this.msgError = '';
  }

}
