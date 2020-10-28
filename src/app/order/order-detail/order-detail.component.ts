import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
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
          if (response.client) {
            this.order = response;
          }
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
