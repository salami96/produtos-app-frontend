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
  loadedProducts: Product[];
  categories: Category[];
  url = 'https://produtos-server.herokuapp.com/api';
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
    // this.loadStores();
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
    this.http.get<Store[]>(this.url + '/stores/', this.options).subscribe(resp => {
      this.stores = resp;
    });
  }

  filterStore(code: string, cb: Function) {
    this.http.get<Store>(`${this.url}/store/${code}`, this.options).subscribe(resp => {
      this.setStore(resp, cb);
    });

    // if (this.stores) {
    //   const resp = this.stores.find(store => store.code === code);
    // } else {
    //   setTimeout(() => {
    //     this.filterStore(code, cb);
    //   }, 75);
    // }
  }

  setStore(store: Store, cb: Function) {
    cb(store);
    this.selectedStore = store;
    this.store.next(store);
    this.http.get<Product[]>(`${this.url}/products/${store.code}`, this.options).subscribe(resp => {
      this.products.next(resp);
      this.loadedProducts = resp;
    });
  }
}
