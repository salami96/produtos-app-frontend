import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { StoreService } from '../services/store.service';
import { isPlatformBrowser } from '@angular/common';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  safeHtml: SafeHtml;
  categories: Category[];
  buttons = [];
  query: string;
  selectedCategory: string;
  products: Product[];
  filteredProducts: Product[];
  filterTitle: string;
  observer: Subscription[] = [];
  store: Store;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private sService: StoreService,
    @Inject(PLATFORM_ID) private platformID: Object,
  ) { }

  ngOnInit() {
    if (this.sService.selectedStore) {
      this.init(this.sService.selectedStore);
    } else {
      this.observer.push(
        this.sService.store.subscribe(this.init)
      );
    }
    if (isPlatformBrowser(this.platformID)) {
      document.querySelector('nav').style.setProperty('box-shadow', '0 0 0 1em var(--dark)');
      this.selectedCategory = this.route.snapshot.queryParamMap.get('categoria');
      // this.showCategories();
      if (this.selectedCategory) {
        this.setCategory(this.selectedCategory);
      } else {
        this.query = this.route.snapshot.queryParamMap.get('busca');
        if (this.query) {
          this.searchName();
        }
      }
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

  init = (store: Store) => {
    this.store = store;
    this.categories = store.categories;
    this.sService.getProducts().subscribe(r => {
      this.products = r
      this.filteredProducts = r
    });
  }

  isActive(i: number) {
    if (this.selectedCategory) {
      return this.categories[i].name.toLowerCase() === this.selectedCategory.toLowerCase();
    } else {
      return i === 0;
    }
  }

  /* showCategories() {
    for (let index = 0; index < this.categories.length; index++) {
      const el = this.categories[index];
      this.buttons.push(`
        <label class="btn btn-outline-theme ${this.isActive(index) ? 'active' : ''}" value="${el.name}">
        <input type="radio">
          ${el.icon}
          ${el.name}
        </label>
      `);
    }
    if (this.buttons !== undefined) {
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.buttons.join(''));
    }
    var arr = [].slice.call(document.querySelector('#categorias').children);
    console.log(Array.from(document.querySelector('#categorias').children));
  } */

  searchName() {
    // console.log(this.query);
    // this.loading = true;
    if (this.query) {
      this.filterTitle = 'Pesquisa: ' + this.query;
      this.filteredProducts = this.products.filter(prod =>
        prod.name.toLowerCase().includes(this.rmAccents(this.query))
      );
    } else {
      this.setCategory('todos');
    }
    // this.total = 50;
    /* this.pService
      .searchProducts('nome', this.rmAccents(this.query))
      .subscribe((resp) => this.setResults(resp)); */
  }

  setCategory(text: string) {
    if (text.toLowerCase() === 'todos') {
      this.filteredProducts = this.products;
      this.filterTitle = 'Todos os produtos';
    } else {
      this.filterTitle = text;
      if (this.products) {
        this.filteredProducts = this.products.filter(prod =>
          prod.category.toLowerCase() === text.toLowerCase()
        );
      } else {
        this.filteredProducts = [];
      }
    }
    // console.log(this.query);
    // this.loading = true;
    // this.
    // if (this.selectedCategory) {
    //   this.filterTitle = 'Categoria: ' + this.selectedCategory;
    //   this.filteredProducts = this.products.filter(prod =>
    //     prod.category === this.selectedCategory
    //   );
    // } else {
    //   this.filterTitle = '';
    //   this.filteredProducts = this.products;
    // }
    // this.total = 50;
    /* this.pService
      .searchProducts('nome', this.rmAccents(this.query))
      .subscribe((resp) => this.setResults(resp)); */
  }


  formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }

  rmAccents(s: string) {
    let r = s.toLowerCase();
    const non_asciis = {
      a: '[àáâãäå]',
      ae: 'æ',
      c: 'ç',
      e: '[èéêë]',
      i: '[ìíîï]',
      n: 'ñ',
      o: '[òóôõö]',
      oe: 'œ',
      u: '[ùúûűü]',
      y: '[ýÿ]',
    };
    // tslint:disable-next-line: forin
    for (const i in non_asciis) {
      r = r.replace(new RegExp(non_asciis[i], 'g'), i);
    }
    return r;
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.forEach(o => o.unsubscribe());
    }
  }



}
