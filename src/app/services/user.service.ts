import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLogged: boolean;
  private gabriel: User = {
    uid: 'CdwOhW7bSkXImlu7kIlJLGq9MFz2',
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
    }],
    avatar: ''
  };
  private copac: User = {
    uid: '6KFeFgJeaMaddSBt2kmxRqRczPE3',
    name: 'Supercopac',
    phone: '5136584137',
    email: 'supercopac@terra.com.br',
    address: [{
      name: 'Loja',
      street: 'Av. Cruz de Malta',
      number: '705',
      district: 'Centro',
      city: 'Charqueadas',
      state: 'RS',
      zipCode: '96745000'
    }],
    avatar: ''
  };
  private nick: User = {
    uid: 'gWOYqR4oWYXAgkKwDaW3iQ3ua9c2',
    name: 'Nicole Lopes',
    phone: '51998446478',
    email: 'nicolelopes7777@gmail.com',
    address: [{
      name: 'Casa',
      street: 'Núcleo F-49',
      number: '59',
      district: 'Piratini',
      city: 'Charqueadas',
      state: 'RS',
      zipCode: '96745000'
    }],
    avatar: ''
  };
  userData: User;
  // url = 'https://produtos-server.herokuapp.com';
  url = 'http://localhost:9000';
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
    http.get(this.url, this.options).subscribe(resp => console.log(resp));
    auth().onAuthStateChanged(user => {
      if (user) {
        this.isLogged = true;
      } else {
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
    const googleProvider = new auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({
      'prompt': 'select_account'
    });
    const facebookProvider = new auth.FacebookAuthProvider();
    let method: auth.AuthProvider;

    if (provider === 'google') {
      method = googleProvider;
    } else if (provider === 'facebook') {
      method = facebookProvider;
    }

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

  public logout() {
    this.userData = undefined;
    return auth().signOut();
  }

  private getUser(uid: string, page: string) {
    this.http.post<User>(
      `${this.url}/user`, { uid }, this.options
    ).subscribe(user => {
      this.userData = user;
      this.router.navigate(['/' + page]);
    });
  }

  private saveUser(user: User, page: string) {
    this.http.post<User>(
      `${this.url}/new-user`, user, this.options
    ).subscribe(resp => {
      this.userData = user;
      this.router.navigate(['/' + page]);
    });
  }
/*   setUserData(user: any) {
    if (user) {
      this.isLogged = true;
      switch (user.uid) {
        case this.gabriel.uid:
          this.userData = this.gabriel;
          break;
        case this.copac.uid:
          this.userData = this.copac;
          break;
        case this.nick.uid:
          this.userData = this.nick;
          break;
        default:
          console.log('token invalido: ' + user.uid);
          break;
      }
    } else {
      this.isLogged = false;
    }
  }
 */
}
