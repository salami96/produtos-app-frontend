import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../services/cart.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

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

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformID: Object,
    private cService: CartService,
  ) {
    this.observer = this.cService.order().subscribe(resp => {
      this.items = resp;
      this.showBadges(resp);
      console.log("subscribe");
    });
  }

  ngOnInit() {

    console.log("oninit");
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
/*   getProp(item: OrderItem , property) {
    let text;
    switch (property) {
      case 'extra':
        if (item.extras.length > 0) {
          text = '';
          item.extras.forEach((ext) => {
            text += ext.name;
            if (item.extras.lastIndexOf(ext) < (item.extras.length - 1)) {
              text += ', ';
            }
          });
        }
        break
    }
    return text;
  } */

  showBadges(items) {
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
      if (text !== undefined) {
        this.safeHtml[index] = this.sanitizer.bypassSecurityTrustHtml(text);
      }
    }
  }

}
