import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  [x: string]: Object;
  store = new Subject<Store>();
  products = new Subject<Product[]>();
  categories: Category[];
  url = 'https://produtos-server.herokuapp.com/api/';
  // url = 'http://10.1.1.119:9000/';
  options = {
    headers: {
      'authorization': 't5b3b9a5',
      'Access-Control-Allow-Origin': '*'
    }
  };
  selectedStore: Store;
  stores: Store[];

  constructor(
    private http: HttpClient,
  ) {
    this.loadStores();
  }

  getProducts() {
    return this.products;
  }

  getProduct(cod: string) {
    let code: string;
    if (this.selectedStore) {
      code = this.selectedStore.code;
    } else {
      let current = window.location.host.split('.')[0];
      code = current;

      if (
        current.includes('localhost') ||
        current.includes('www') ||
        current.includes('1') ||
        current.includes('produtos-app')
        ) {
        code = 'jadore';
      }
    }
    return this.http.get<Product>(`${this.url}/product/${code}/${cod}`, this.options);
  }

  loadStores() {
    this.http.get<Store[]>(this.url + 'stores/', this.options).subscribe(resp => {
      this.stores = resp;
    });
  }

  filterStore(code: string, cb: any) {
    if (this.stores) {
      const resp = this.stores.find(store => store.code === code);
      cb(resp);
      this.store.next(resp);
      this.selectedStore = resp;
      this.http.get<Product[]>(this.url + 'products/' + code, this.options).subscribe(resp2 => this.products.next(resp2));
    } else {
      setTimeout(() => {
        this.filterStore(code, cb);
      }, 250);
    }
  }
}
