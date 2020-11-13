import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { store } from '@angular/core/src/render3';
import { SafeHtml, DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { auth } from 'firebase';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  cod: string;
  order: Order;
  isExpanded: boolean[] = [];
  safeHtml: SafeHtml[] = [];
  user: User;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformID: Object,
    private cService: CartService,
    private uService: UserService,
    private title: Title,
    private meta: Meta,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      auth().onAuthStateChanged(user => {
        this.user = this.uService.userData;
        if (!this.user) {
          setTimeout(() => {
            this.user = this.uService.userData;
            if (this.user._id !== (this.order.client as any)._id) {
              this.order = undefined;
            }
          }, 2000);
        }
      });
      this.isExpanded['itens'] = true;
      this.route.params.subscribe(async res => {
        this.cod = res.cod;
        this.cService.getOrder(res.cod).then(response => {
          this.showBadges(response);
          this.order = response;
          console.log(response);
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

  showBadges(order: Order) {
    this.title.setTitle(this.title.getTitle() + ' - Pedido nº: ' + order.cod);
    this.meta.updateTag({ property: 'og:type', content: 'product' });
    this.meta.updateTag({ property: 'og:title', content: this.title.getTitle() });
    for (let index = 0; index < order.products.length; index++) {
      const el = order.products[index];
      this.meta.addTag({ property: 'og:image', content: el.img, itemprop: 'image' });

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
