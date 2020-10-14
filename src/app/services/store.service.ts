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
  // url = 'https://produtos-server.herokuapp.com/';
  url = 'http://localhost:9000/';
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
    this.store.next({
      color: 'blue',
      ownerUid: '',
      code: 'exemplo',
      title: 'Sua Loja',
      logo: 'https://180solucoes.com.br/wp-content/uploads/2020/08/sua-logo-aqui.png',
      favicon: 'https://www.supercopac.com.br/favicon.ico',
      slogan: 'Seu slogan ou lema aqui...',
      phone: '00 00000000',
      whatsapp: 'https://wa.me/',
      fb: 'https://www.facebook.com/',
      insta: 'https://www.instagram.com/',
      email: 'sualoja@email.com',
      address: [{
        street: 'Rua exemplo',
        number: '0',
        district: 'Bairro',
        city: 'Porto Alegre',
        state: 'RS',
        name: 'Filial 1',
        zipCode: '90030-000',
        reference: '',
        complement: ''
      }],
      map: 'https://www.google.com/maps/embed?',
      directions: 'https://www.google.com/maps/dir/',
      payments: [],
      ship: [],
      categories: []
    });
  }

  getProducts() {
    return this.products;
  }

  async getProduct(cod: string): Promise<Product> {
    return this.getProducts().find(prod => prod.cod === cod);
  }

  loadStore(code: string, cb: any) {
    this.http.get<Product[]>(this.url + 'products/' + code, this.options).subscribe(resp2 => this.products = resp2);
    this.http.get<Store>(this.url + 'store/' + code, this.options).subscribe(resp => {
      cb(resp);
      this.store.next(resp);
      this.selectedStore = resp;
    });
  }
}
