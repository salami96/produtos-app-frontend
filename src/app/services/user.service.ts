import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLogged: boolean;
  userData: User;
  url = 'https://produtos-server.herokuapp.com/api';
  // url = 'http://10.1.1.119:9000';
  options = {
    headers: {
      'authorization': 't5b3b9a5',
      'Access-Control-Allow-Origin': '*'
    }
  };
  store: any;
  orders: Order[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object,
    private http: HttpClient,
    private router: Router,
    private sService: StoreService
  ) {
    if (this.sService.selectedStore) {
      this.store = this.sService.selectedStore;
    } else {
      this.sService.store.subscribe(resp => {
        this.store = resp;
      });
    }
    if (isPlatformBrowser(this.platformID)) {
      http.get(this.url, this.options);
      this.verifyLocalStorage();
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
  }

  public verifyLocalStorage(page?: string) {
    if (localStorage['token']) {
      this.getUser(localStorage['token'], page);
    }
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

  private getUser(uid: string, page?: string) {
    this.http.get<User>(
      `${this.url}/user/${uid}`, this.options
      ).subscribe(user => {
      this.isLogged = true;
      this.userData = user;
      if (page) {
        this.router.navigate(['/' + page]);
      }
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

  public async editUserAvatar(form: HTMLFormElement) {
    const data = new FormData(form);
    data.append('uid', this.userData.uid);
    console.log(data);

    // const op = {
    //   headers: this.options.headers,
    //   enctype: 'multipart/form-data',
    //   processData: false,
    //   contentType: false,
    // };

    const response = this.http.put<User>(`${this.url}/user-avatar`, data, this.options);
    // const response = this.http.put<User>(`http://localhost:9000/user-avatar`, data, this.options);

    response.subscribe(resp => {
      this.userData = resp;
      if (auth().currentUser.photoURL !== resp.avatar) {
        auth().currentUser.updateProfile({
          photoURL: resp.avatar
        });
      }
    }, error => {
      console.log(error);
    });

    return response;
  }

  public async address(address: Address, page: string, del = false) {
    if (del) {
      return this.http.delete<User>(
        `${this.url}/address/${this.userData.uid}/${address.name}`,
        this.options
      );
    }

    const response = this.http.put<User>(
      `${this.url}/address`, { uid: this.userData.uid, address }, this.options
    );

    response.subscribe(resp => {
      this.userData = resp;
      this.router.navigate(['/' + page]);
    }, error => {
      console.log(error);
    });

    return response;
  }

  public zipRequest(zipCode: string) {
    return this.http.get(`https://viacep.com.br/ws/${zipCode}/json/`);
  }

  public getOrders(s: string) {
    return this.http.get<Order[]>(`${this.url}/orders-by-client/${s}/${this.userData._id}`, this.options);
  }

}
