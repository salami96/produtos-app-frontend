import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { isPlatformBrowser } from '@angular/common';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  safeHtml: SafeHtml;
  categories: Category[];
  buttons = [];
  query: string;
  products: Product[];

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private store: StoreService,
    @Inject(PLATFORM_ID) private platformID: Object,
  ) { }

  ngOnInit() {
    this.categories = this.store.store.categories;
    this.products = this.store.getProducts();
    if (isPlatformBrowser(this.platformID)) {
      document.querySelector('nav').style.setProperty('box-shadow', '0 0 0 1em var(--dark)');
      this.showCategories();
      const selectedCategory: string = this.route.snapshot.queryParamMap.get('categoria');
      const searchedName: string = this.route.snapshot.queryParamMap.get('busca');
      // console.log(category);
      // this.route.params.subscribe(async res => {
      //   console.log(res.categoria);
      //   // this.cod = res.cod;
      //   // this.service.getProduct(res.cod).then(response =>
      //   //   this.product = response
      //   // ).catch(e => console.log(e));
      // });
    }
  }

  showCategories() {
    for (let index = 0; index < this.categories.length; index++) {
      const el = this.categories[index];
      this.buttons.push(
      `
        <label class="btn btn-outline-theme ${index === 0 ? 'active' : ''}" (click)="setTitle('${el.name}')">
        <input type="radio" ${index === 0 ? 'checked' : ''}>
          ${el.icon}
          ${el.name}
        </label>
      `);
      this.buttons.push(
      `
        <label class="btn btn-outline-theme" (click)="setTitle('${el.name}')">
        <input type="radio">
          ${el.icon}
          ${el.name}
        </label>
      `);
      this.buttons.push(
      `
        <label class="btn btn-outline-theme" (click)="setTitle('${el.name}')">
        <input type="radio">
          ${el.icon}
          ${el.name}
        </label>
      `);
      this.buttons.push(
      `
        <label class="btn btn-outline-theme" (click)="setTitle('${el.name}')">
        <input type="radio">
          ${el.icon}
          ${el.name}
        </label>
      `);
    }
    if (this.buttons !== undefined) {
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.buttons.join(''));
    }
  }

  searchName() {
    console.log(this.query);
  }

  formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }


}
