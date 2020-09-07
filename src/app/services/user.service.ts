import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Observable<firebase.User>;
  userData: User;
  gabriel: User = {
    uid: 'Fkj4HEnFfTP5TuWXJGmPkoWvkZh1',
    name: 'Gabriel Zanatto Salami',
    phone: '51999262182',
    email: 'gabriel.zanatto2@gmail.com',
    address: [{
      name: 'Casa',
      street: 'Rua São Carlos',
      number: '10',
      district: 'Interior',
      city: 'Charqueadas',
      state: 'RS',
      zipCode: '96745000'
    }]
  };


  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
  ) {
    // this.user.subscribe();
    this.user = afAuth.authState;
    if (localStorage['token'] === this.gabriel.uid) {
      this.userData = this.gabriel;
    }
  }

  public login(mail: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(mail, password).then((user) => {
      localStorage['token'] = user.uid;
      if (user.uid === this.gabriel.uid) {
        this.userData = this.gabriel;
      }
    });
  }

  public providerLogin(provider: string) {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    let method;

    if (provider === 'google') {
      method = googleProvider;
    } else if (provider === 'facebook') {
      method = facebookProvider;
    }

    return this.afAuth.auth.signInWithPopup(method).then(user => {
      localStorage['token'] = user.uid;
      if (user.uid === this.gabriel.uid) {
        this.userData = this.gabriel;
      }
    });
  }

  public logout() {
    localStorage['token'] = '';
    this.userData = undefined;
    return this.afAuth.auth.signOut();
  }

}
