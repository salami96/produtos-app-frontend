import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../services/cart.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { auth } from 'firebase';
import { StoreService } from '../services/store.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  items: OrderItem[] = [];
  observer: Subscription[] = [];
  isExpanded: boolean[] = [];
  safeHtml: SafeHtml[] = [];
  user: User;
  selectedAddress: Address;
  formaPgto: Payment;
  selectedItem: OrderItem;
  selectedItemPosition: number;
  baseProduct: Product;
  selectedSize: any;
  optional: boolean[] = [];
  extras: {
    name: string,
    value: number,
    checked: boolean,
  }[];
  observations: string;
  itemQuantity: number;
  itemTotal: number;
  selectedExtras: { name: string; value: number; checked: boolean; }[];
  store: Store;
  quantity: number;
  total = 0;
  shipment = 0;
  paymentError = false;
  shipmentError = false;
  pickUp: boolean;
  loading: boolean;


  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformID: Object,
    private cService: CartService,
    private uService: UserService,
    private sService: StoreService,
    private router: Router
  ) { }

  ngOnInit() {
    auth().onAuthStateChanged(user => {
      this.user = this.uService.userData;
      if (!this.user) {
        setTimeout(() => {
          this.user = this.uService.userData;
        }, 2000);
      }
    });
    if (this.sService.selectedStore) {
      this.store = this.sService.selectedStore;
    } else {
      this.observer.push(
        this.sService.store.subscribe(resp => this.store = resp)
      );
    }


    if (isPlatformBrowser(this.platformID)) {
      this.isExpanded['itens'] = true;
      this.isExpanded['shipment'] = true;
      this.isExpanded['resume'] = true;
      document.querySelector('nav').style.setProperty('box-shadow', 'none');
      this.observer.push(
        this.cService.order().subscribe(resp => {
          this.items = resp;
          this.showBadges(resp);
        })
      );
    }
    this.recalculate();
  }

  rmItem(item: OrderItem, i: number) {
    this.cService.rmFromCart(item, i);
    this.recalculate();
    this.clearSelected();
  }

  async editItem(i: number, item: OrderItem) {
    // document.getElementById('edit-item').className += ' show';
    this.selectedItemPosition = i;
    this.selectedItem = item;
    this.sService.getProduct(item.cod).subscribe(r => this.baseProduct = r);
    this.selectedSize = this.baseProduct.sizes.find(s => s.name === item.size);
    this.baseProduct.optional.forEach(op => {
      this.optional[op] = item.removed.includes(op);
    });
    this.extras = [];
    for (let index = 0; index < this.baseProduct.extras.length; index++) {
      const element: any = this.baseProduct.extras[index];
      item.extras.forEach((extra: any) => {
        if (extra.name === element.name) {
          element.checked = extra.checked;
        }
      });
      this.extras.push(element);
    }
    this.observations = item.observations;
    this.itemQuantity = item.quantity;
    this.itemTotal = item.total;
  }

  changeQuantity(op?: string) {
    if (op === 'add') {
      this.itemQuantity++;
    } else if (op === 'minus') {
      this.itemQuantity--;
    }
    if (this.itemQuantity < 1) {
      this.itemQuantity = 1;
    }
  }

  getPrice() {
    let total = 0;
    if (this.selectedItem && this.baseProduct) {
      if (this.extras.length > 0) {
        this.selectedExtras = this.extras.filter(extra => extra.checked);
        this.selectedExtras.forEach(ext => {
          total += ext.value;
        });
      }
      if (this.baseProduct.sizes.length > 1) {
        total += this.selectedSize.value;
      } else {
        total += this.baseProduct.sizes[0].value;
      }
      total *= this.itemQuantity;
    }
    return this.formatPrice(total);
  }

  clear() {
    this.items = [];
    this.cService.clear();
    this.recalculate();
  }

  clearSelected() {
    this.selectedItem = undefined;
    this.selectedItemPosition = undefined;
    this.baseProduct = undefined;
    this.selectedSize = undefined;
    this.optional = [];
    this.extras = [];
    this.observations = undefined;
    this.itemQuantity = undefined;
    this.itemTotal = undefined;
    this.selectedExtras = [];
    document.getElementById('edit-item-success').click();
    this.shipmentError = false;
    this.paymentError = false;
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.forEach(o => o.unsubscribe());
    }
  }

  calcShip(z: string) {
    const found = this.store.ship.find(s => s.zipCode.substr(0,5) === z.substr(0,5));
    if (found) {
      return found.value;
    }
    return -1;
  }

  formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }

  showBadges(items: OrderItem[]) {
    for (let index = 0; index < items.length; index++) {
      const el = items[index];
      let text = '';
      if (el.extras.length > 0) {
        text += '<hr class="m-0"><p class="m-0">Adicionar: ';
        el.extras.forEach(ext => {
          text += `<span class="badge badge-pill badge-theme">${ext.name}</span>`;
        });
        text += '</p>';
      }
      if (el.removed.length > 0) {
        text += '<hr class="m-0"><p class="m-0">Retirar: ';
        el.removed.forEach(rm => {
          text += `<span class="badge badge-pill badge-theme">${rm}</span>`;
        });
        text += '</p>';
      }
      if (el.observations) {
        text += `<hr class="m-0"><p class="m-0">Obs.: ${el.observations}</p>`;
      }
      if (text === '') {
        this.safeHtml[index] = this.sanitizer.bypassSecurityTrustHtml('<hr class="m-0"><p>Sem alterações...</p>');
      } else if (text !== undefined || text !== '') {
        this.safeHtml[index] = this.sanitizer.bypassSecurityTrustHtml(text);
      }
    }
  }

  read(ad: Address) {
    return `${ad.name}: ${ad.street}, ${ad.number}, ${ad.district}, ${ad.city} - ${ad.state}`;
  }

  saveChanges() {
    if (this.baseProduct) {
      let total = 0;
      let removed: string[];
      removed = [];
      this.baseProduct.optional.forEach(op => {
        if (this.optional[op]) {
          removed.push(op);
        }
      });
      if (this.extras.length > 0) {
        this.selectedExtras = this.extras.filter(extra => extra.checked);
        this.selectedExtras.forEach(ext => {
          total += ext.value;
        });
      }
      if (this.baseProduct.sizes.length > 1) {
        total += this.selectedSize.value;
      } else {
        total += this.baseProduct.sizes[0].value;
      }
      total *= this.itemQuantity;

      const orderItem: OrderItem = {
        cod: this.baseProduct.cod,
        img: this.baseProduct.imgs[0],
        name: this.baseProduct.name,
        size: this.selectedSize.name,
        total,
        value: this.selectedSize.value,
        extras: this.selectedExtras,
        removed,
        quantity: this.itemQuantity,
        observations: this.observations,
      };
      this.cService.updateCart(orderItem, this.selectedItemPosition);
      this.recalculate();
      this.clearSelected();
    }
  }

  setShipment(ad: Address, isPickUp = false) {
    this.pickUp = isPickUp;
    if (this.calcShip(ad.zipCode) < 0 || isPickUp) {
      this.shipment = 0;
    } else {
      this.shipment = this.calcShip(ad.zipCode);
    }
    if (isPickUp) {
      this.selectedAddress = ad;
    } else {
      this.selectedAddress = ad;
    }
    this.recalculate();
  }

  recalculate() {
    this.quantity = this.cService._quantity;
    let sum = 0;
    this.items.forEach(item => {
      sum += item.total;
    });
    this.total = (this.shipment + sum);
  }

  finish() {
    this.clearSelected();
    let valid = true;
    if (this.selectedAddress === undefined) {
      this.shipmentError = true;
      valid = false;
    }
    if (this.formaPgto === undefined) {
      this.paymentError = true;
      valid = false;
    }
    if (valid) {
      this.loading = true;
        this.cService.buy(
        this.store._id,
        this.user._id,
        this.selectedAddress._id,
        this.formaPgto._id,
        this.pickUp,
        this.total
      ).toPromise().then(resp => {
        if (resp) {
          this.clear();
          this.loading = false;
          document.getElementById('show-success').click();
          setTimeout(() => {
            document.getElementById('close-success').click();
            this.router.navigate([ '/pedido/' + resp._id ]);
            const url = `https://${this.store.code}.produtos.app/pedido/${resp._id}`;
            window.open(`https://api.whatsapp.com/send?phone=55${this.store.phone}&text=Olá, fiz o pedido nº ${resp.cod} no seu site, link: ${url}`);
          }, 5000);
          console.log(resp);
        }
      }).catch(e => {
        console.log(e);
        this.loading = false;
      });
    }

  }
}
