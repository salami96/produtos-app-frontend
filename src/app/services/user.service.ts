import { Injectable } from '@angular/core';
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

  constructor() {
    auth().onAuthStateChanged(user => {
      this.setUserData(user);
    });
  }

  public login(mail: string, password: string) {
    return auth().signInWithEmailAndPassword(mail, password);
  }

  public providerLogin(provider: string) {
    const googleProvider = new auth.GoogleAuthProvider();
    const facebookProvider = new auth.FacebookAuthProvider();
    let method: auth.AuthProvider;

    if (provider === 'google') {
      method = googleProvider;
    } else if (provider === 'facebook') {
      method = facebookProvider;
    }

    return auth().signInWithPopup(method).then(user => {
      this.setUserData(user);
    });
  }

  public save(name: string, phone: string, email: string, password: string) {
    return auth().createUserWithEmailAndPassword(email, password).then(user => {
      console.log(user);
    });
  }

  public logout() {
    this.userData = undefined;
    return auth().signOut();
  }

  setUserData(user: any) {
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

}
