import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  items: OrderItem[] = [];
  observer: any;
  isExpanded: boolean[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object,
    private cService: CartService
  ) { }

  ngOnInit() {
    this.observer = this.cService.order().subscribe(resp => {
      this.items = resp;
    });
    // this.items = this.cService.getItems();
    if (isPlatformBrowser(this.platformID)) {
      document.querySelector('nav').style.setProperty('box-shadow', 'none');
    }
  }

  clear() {
    this.items = [];
    this.cService.clear();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.unsubscribe();
    }
  }

  formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }

  show() {
    console.log(this.items);
  }

}
