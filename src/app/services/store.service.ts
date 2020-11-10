import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  store: Subject<Store> = new Subject<Store>();
  products: Product[];
  categories: Category[];
  url = 'https://produtos-server.herokuapp.com/';
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

  async getProduct(cod: string): Promise<Product> {
    return this.getProducts().find(prod => prod.cod === cod);
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
    } else {
      setTimeout(() => {
        this.filterStore(code, cb);
      }, 250);
    }
    this.http.get<Product[]>(this.url + 'products/' + code, this.options).subscribe(resp2 => this.products = resp2);
  }
}
