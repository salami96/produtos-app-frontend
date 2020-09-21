import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLogged: boolean;
  userData: User;
  // url = 'https://produtos-server.herokuapp.com';
  url = 'http://10.1.1.114:9000';
  options = {
    headers: {
      'authorization': 't5b3b9a5',
      'Access-Control-Allow-Origin': '*'
    }
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    http.get(this.url, this.options);
    if (localStorage['token']) {
      this.getUser(localStorage['token'], 'perfil');
    }
    auth().onAuthStateChanged(user => {
      if (user) {
        localStorage['token'] = user.uid;
        this.isLogged = true;
      } else {
        localStorage.removeItem('token');
        this.isLogged = false;
      }
    });
  }

  public login(mail: string, password: string, page: string) {
    return auth().signInWithEmailAndPassword(mail, password).then(user => {
      this.getUser(auth().currentUser.uid, page);
    });
  }

  public providerLogin(provider: string, page: string) {
    auth().languageCode = 'pt';

    const google = new auth.GoogleAuthProvider()
    .setCustomParameters({
      'prompt': 'select_account'
    });
    const facebook = new auth.FacebookAuthProvider();
    let method: auth.AuthProvider;

    method = provider === 'google' ? google : facebook;

    return auth().signInWithPopup(method).then(resp => {
      if (resp.additionalUserInfo.isNewUser) {
        const user: User = {
          name: resp.user.displayName,
          avatar: resp.user.photoURL,
          email: resp.user.email,
          uid: resp.user.uid,
          phone: resp.user.phoneNumber,
          address: []
        };
        this.saveUser(user, page);
      } else {
        this.getUser(resp.user.uid, page);
      }
    });
  }

  public save(name: string, phone: string, email: string, password: string, page: string) {
    return auth().createUserWithEmailAndPassword(email, password).then(resp => {
      const user: User = {
        name,
        avatar: '',
        email,
        uid: resp.user.uid,
        phone,
        address: []
      };
      this.saveUser(user, page);
    });
  }

  public resetPassword(email: string) {
    return auth().sendPasswordResetEmail(email);
  }

  public logout() {
    this.userData = undefined;
    return auth().signOut();
  }

  private getUser(uid: string, page: string) {
    this.http.get<User>(
      `${this.url}/user/${uid}`, this.options
      ).subscribe(user => {
      this.isLogged = true;
      this.userData = user;
      this.router.navigate(['/' + page]);
    });
  }

  private saveUser(user: User, page: string) {
    this.http.post<User>(
      `${this.url}/user`, user, this.options
    ).subscribe(resp => {
      this.userData = user;
      this.router.navigate(['/' + page]);
    });
  }

  public changePassword(pass: string) {
    return auth().currentUser.updatePassword(pass);
  }

  public async editUser(user: User) {
    const response = this.http.put<User>(
      `${this.url}/user`, user, this.options
    );

    response.subscribe(resp => {
      this.userData = resp;
      if (auth().currentUser.displayName !== resp.name ||
      auth().currentUser.photoURL !== resp.avatar) {
        auth().currentUser.updateProfile({
          displayName: resp.name,
          photoURL: resp.avatar
        });
      }
    }, error => {
      console.log(error);
    });

    return response;
  }
}
