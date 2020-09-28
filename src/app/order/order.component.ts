import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../services/cart.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { auth } from 'firebase';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  items: OrderItem[] = [];
  observer: any;
  isExpanded: boolean[] = [];
  safeHtml: SafeHtml[] = [];
  user: User;
  selectedAdress: string;
  formaPgto: string;
  selectedItem: OrderItem;
  baseProduct: Product;
  selectedSize: any;
  optional: boolean[] = [];
  extras: {
    name: string,
    value: number,
    checked: boolean,
  }[];


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
      this.observer = this.cService.order().subscribe(resp => {
        this.items = resp;
        this.showBadges(resp);
      });
    }
  }

  rmItem(item: OrderItem, i: number) {
    this.cService.rmFromCart(item, i);
  }

  async editItem(i: number, item: OrderItem) {
    // document.getElementById('edit-item').className += ' show';
    this.selectedItem = item;
    this.baseProduct = await this.sService.getProduct(item.cod);
    this.selectedSize = this.baseProduct.sizes.find(s => s.name === item.size);
    this.baseProduct.optional.forEach(op => {
      this.optional[op] = item.removed.includes(op);
    });
    this.extras = [];
    console.log(item.extras);
    
    for (let index = 0; index < this.baseProduct.extras.length; index++) {
      const element: any = this.baseProduct.extras[index];
      element.checked = item.extras.includes(element);
      this.extras.push(element);
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



}
