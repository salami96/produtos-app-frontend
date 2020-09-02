import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User;
  private _userObserver: Subscriber<User>;

  constructor() {
    this.user().subscribe();
  }

  user(): Observable<User> {
    return new Observable<User>(observer => {
      observer.next(this._user);
      this._userObserver = observer;
    });
  }

  private _setUser(u?: User) {
    if (u) {
      this._user = u;
      this._userObserver.next(u);
    } else {
      this._user = undefined;
      this._userObserver.next(undefined);
    }
  }
}
