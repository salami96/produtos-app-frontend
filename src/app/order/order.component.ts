import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  items: OrderItem[];

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object,
    private cService: CartService
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      document.querySelector('nav').style.setProperty('box-shadow', 'none');
      this.cService.order().subscribe(
        value => {
          this.items = value;
        }, erro => {
          console.log(erro);
        }, () => {
          this.items = [];
        }
      );
    }
  }

}
