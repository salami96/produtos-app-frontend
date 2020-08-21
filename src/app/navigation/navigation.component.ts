import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StoreService } from '../services/store.service';
import { CartService } from '../services/cart.service';
import { animate } from '@angular/animations';

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

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object,
    public service: StoreService,
    public cartService: CartService,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      this.canLoad = true;
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
      );
    }
  }

}
