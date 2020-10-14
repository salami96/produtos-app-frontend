import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StoreService } from '../services/store.service';
import { CartService } from '../services/cart.service';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  canLoad = false;
  qtt = 0;
  cartTop = false;
  cartBottom = false;
  store: Store;

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object,
    public service: StoreService,
    public cartService: CartService,
  ) { }

  ngOnInit() {
    if (this.service.selectedStore) {
      this.store = this.service.selectedStore;
    } else {
      this.service.store.subscribe(resp => this.store = resp);
    }
    if (isPlatformBrowser(this.platformID)) {
      this.canLoad = true;
      this.cartService.quantity().subscribe(value => {
        this.cartTop = true;
        this.cartBottom = true;
        setTimeout(() => {
          this.cartTop = false;
          this.cartBottom = false;
        }, 1000);
        this.qtt = value;
      });
    }
  }
}
