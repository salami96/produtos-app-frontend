import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  cod: string;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformID: Object,
    private service: StoreService,
  ) {}

  ngOnInit() {
    // this.store = this.service.store;
    // this.uService.ping().subscribe(resp => console.log(resp));
    document.querySelector('nav').style.setProperty('box-shadow', 'none');
    if (isPlatformBrowser(this.platformID)) {
      this.route.params.subscribe(async res => {
        this.cod = res.cod;
        this.service.getProduct(res.cod).then(response =>
          this.product = response
        ).catch(e => console.log(e));
      });
    }
  }
}
