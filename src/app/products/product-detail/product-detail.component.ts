import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  cod: string;
  product: Product;
  observations: string;
  quantity: number;
  selectedSize: any;
  extras: {
    name: string,
    value: number,
    checked: boolean,
  }[];
  selectedExtras: any[];
  optional: boolean[];
  observer: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformID: Object,
    private service: StoreService,
    private cService: CartService,
    @Optional() @Inject('host') private host: string,
    @Optional() @Inject('param') private param: string,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      document.querySelector('nav').style.setProperty('box-shadow', 'none');
      this.observer.push(
        this.route.params.subscribe(res => {
          this.cod = res.cod;
          if (!this.product)
            this.observer.push(this.service.getProduct(res.cod).subscribe(this.productHandler, e => console.log(e)));
        })
      );
    } else if (isPlatformServer(this.platformID)) {
      let code = this.host.split('.')[0];
      let id = this.param.match(/\/produtos\/(?<value>[a-zA-Z0-9|_-]+)/)[1];
      this.observer.push(
        this.service.getProduct(id, code).subscribe(this.productHandler, e => console.log(e))
      );
    }
  }

  productHandler = (response) => {
    if (response) {
      this.product = response;
      this.init();
    }
  }

  init() {
    this.quantity = 1;
    this.observations = '';
    this.selectedSize = this.product.sizes[0];
    this.optional = [];
    this.product.optional.forEach(op => {
      this.optional[op] = false;
    });
    this.extras = [];
    this.selectedExtras = [];
    for (let index = 0; index < this.product.extras.length; index++) {
      const element: any = this.product.extras[index];
      element.checked = false;
      this.extras.push(element);
    }
  }

  formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }

  changeQuantity(op?: string) {
    if (op === 'add') {
      this.quantity++;
    } else if (op === 'minus') {
      this.quantity--;
    }
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }

  getPrice() {
    let total = 0;
    if (this.product) {
      if (this.extras.length > 0) {
        this.selectedExtras = this.extras.filter(extra => extra.checked);
        this.selectedExtras.forEach(ext => {
          total += ext.value;
        });
      }
      if (this.product.sizes.length > 1) {
        total += this.selectedSize.value;
      } else {
        total += this.product.sizes[0].value;
      }
      total *= this.quantity;
    }
    return this.formatPrice(total);
  }

  buy() {
    let removed: string[];
    removed = [];
    this.product.optional.forEach(op => {
      if (this.optional[op]) {
        removed.push(op);
      }
    });

    let total = 0;
    if (this.product) {
      if (this.extras.length > 0) {
        this.selectedExtras = this.extras.filter(extra => extra.checked);
        this.selectedExtras.forEach(ext => {
          total += ext.value;
        });
      }
      if (this.product.sizes.length > 1) {
        total += this.selectedSize.value;
      } else {
        total += this.product.sizes[0].value;
      }
      total *= this.quantity;
    }

    const orderItem: OrderItem = {
      cod: this.product.cod,
      img: this.product.imgs[0],
      name: this.product.name,
      size: this.selectedSize.name,
      total,
      value: this.selectedSize.value,
      extras: this.selectedExtras,
      removed,
      quantity: this.quantity,
      observations: this.observations,
    };
    this.cService.add2Cart(orderItem);
    this.init();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.forEach(o => o.unsubscribe);
    }
  }
}
