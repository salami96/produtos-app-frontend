import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreService } from '../services/store.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  orders: Order[] = [];
  error: boolean[] = [];
  password = '';
  name = '';
  phone = '';
  observer: Subscription[] = [];
  avatar: any;
  successMsg: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object,
    private sService: StoreService,
    private uService: UserService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.forEach(o => o.unsubscribe);
    }
  }

  setOrder = (o: Order[]) => {
    this.orders = o;
  }

  ngOnInit() {
    this.user = this.uService.userData;
    if (this.sService.selectedStore) {
      const store = this.sService.selectedStore;
      this.uService.getOrders(store._id).subscribe(this.setOrder);
    } else {
      this.observer.push(
        this.sService.store.subscribe(resp => this.uService.getOrders(resp._id).subscribe(this.setOrder))
      );
    }
    this.error['name'] = false;
    this.error['phone'] = false;
    this.error['senha'] = false;
    this.phone = this.user.phone;
    this.name = this.user.name;
    if (isPlatformBrowser(this.platformID)) {
      if (!this.user.phone) {
        document.getElementById('add-phone').click();
      }
    }
  }

  signOut() {
    this.uService.logout().then(() => {
      this.router.navigate(['/perfil/entrar']);
    });
  }

  read(ad: Address) {
    return `${ad.name}: ${ad.street}, ${ad.number}, ${ad.district}, ${ad.city} - ${ad.state}`;
  }

  editAddress(adress: Address) {
    localStorage[adress.name] = JSON.stringify(adress);
    this.router.navigate(['/perfil/endereco'], { queryParams: { id: adress.name } });
  }

  deleteAddress(address: Address) {
    this.uService.address(address, 'perfil', true).then(user => {
      this.observer.push(
        user.subscribe(u => this.user = u)
      );
      document.getElementById('success').className += 'show';
      setTimeout(() => {
        document.getElementById('success').className = 'alert alert-success alert-dismissible fade';
      }, 5000);
    });
  }

  saveChanges(field: string) {
    switch (field) {
      case 'name':
        if (this.name && this.user.name !== this.name) {
          this.user.name = this.name;
          this.uService.editUser(this.user).then(() => this.success(field));
        } else {
          this.error[field] = true;
        }
      break;
      case 'phone':
        if (this.phone && this.user.phone !== this.phone) {
          this.user.phone = this.phone;
          this.uService.editUser(this.user).then(() => this.success(field));
        } else {
          this.error[field] = true;
        }
      break;
      case 'senha':
        if (this.password.length >= 8) {
          this.uService.changePassword(this.password).then(() => this.success(field));
        } else {
          this.error[field] = true;
        }
      break;
      case 'avatar':
        if (this.avatar) {
          this.uService.editUserAvatar(document.forms.item(0)).then(resp => {
            resp.subscribe(user => {
              this.user = user;
              this.success(field);
            });
          });
        } else {
          this.error[field] = true;
        }
      break;
    }
  }

  success(field: string) {
    this.error[field] = false;
    this.successMsg = true; // document.getElementById('success').className += 'show';
    setTimeout(() => {
      this.successMsg = false; // document.getElementById('success').className = 'alert alert-success alert-dismissible fade';
    }, 5000);
    document.getElementById(field + '-success').click();
  }

  getFace(url: string) {
    if (url.includes('cloudinary')) {
      return url.replace(url.substr(50, 11), 'c_thumb,g_face,h_150,w_150');
    } else {
      return url;
    }
  }

}
