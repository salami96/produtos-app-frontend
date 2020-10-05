import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../services/cart.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { auth } from 'firebase';
import { StoreService } from '../services/store.service';
import { Subscription } from 'rxjs';

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
  selectedAdress: string;
  formaPgto: string;
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


  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformID: Object,
    private cService: CartService,
    private uService: UserService,
    private sService: StoreService
  ) { }

  ngOnInit() {
    auth().onAuthStateChanged(user => {
      this.user = this.uService.userData;
    });
    if (isPlatformBrowser(this.platformID)) {
      this.isExpanded['itens'] = true;
      this.formaPgto = 'Selecione Abaixo';
      document.querySelector('nav').style.setProperty('box-shadow', 'none');
      this.observer.push(
        this.cService.order().subscribe(resp => {
          this.items = resp;
          this.showBadges(resp);
        }),
        this.sService.getStore().subscribe(store => {
          this.store = store;
        })
      );
    }
  }

  rmItem(item: OrderItem, i: number) {
    this.cService.rmFromCart(item, i);
    this.clearSelected();
  }

  async editItem(i: number, item: OrderItem) {
    // document.getElementById('edit-item').className += ' show';
    this.selectedItemPosition = i;
    this.selectedItem = item;
    this.baseProduct = await this.sService.getProduct(item.cod);
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
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.forEach(o => o.unsubscribe());
    }
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
      this.clearSelected();
    }
  }

}
