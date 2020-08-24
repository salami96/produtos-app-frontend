import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  cod: string;
  product: Product;
  observations: string;
  quantity = 1;
  selectedSize: any;
  extras: any[] = [];
  selectedExtras: any[] = [];
  optional: boolean[] = [];

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformID: Object,
    private service: StoreService,
    private cService: CartService,
  ) {}

  ngOnInit() {
    // this.store = this.service.store;
    // this.uService.ping().subscribe(resp => console.log(resp));
    document.querySelector('nav').style.setProperty('box-shadow', 'none');
    if (isPlatformBrowser(this.platformID)) {
      this.route.params.subscribe(async res => {
        this.cod = res.cod;
        this.service.getProduct(res.cod).then(response => {
          this.product = response;
          this.selectedSize = response.sizes[0];
          response.optional.forEach(op => {
            this.optional[op] = false;
          });

          for (let index = 0; index < response.extras.length; index++) {
            // this.extras[index].checked = false;
            const element: any = response.extras[index];
            element.checked = false;
            this.extras.push(element);
          }
          // for (let i: number; i <= response.extras.length; i++) {
          //   this.extras[i].name = response.extras[i].name;
          //   this.extras[i].value = response.extras[i].value;
          //   this.extras[i].checked = false;
          // }
        }).catch(e => console.log(e));
      });
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
    let removed: string[]
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
  }
}
