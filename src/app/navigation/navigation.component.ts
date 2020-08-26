import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StoreService } from '../services/store.service';
import { CartService } from '../services/cart.service';
import { animate } from '@angular/animations';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  canLoad = false;
  qtt = 0;
  cartTop = false;
  cartBottom = false;
  observer: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object,
    public service: StoreService,
    public cartService: CartService,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      this.canLoad = true;
      this.observer.push(
        this.cartService.quantity().subscribe(
          value => {
            this.cartTop = true;
            this.cartBottom = true;
            setTimeout(() => {
              this.cartTop = false;
              this.cartBottom = false;
            }, 1000);
            this.qtt = value;
          }, erro => {
            console.log(erro);
          }, () => {
            this.qtt = 0;
          }
        ),
        this.cartService.order().subscribe(v => console.log('subscribed'))
      );
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.forEach(obs => obs.unsubscribe());
    }
  }

}
