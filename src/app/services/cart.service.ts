import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const { CryptoStorage } = require('@webcrypto/storage');

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _quantity = 0;
  private _qttObserver;
  private _orderObserver;
  private _orderItems: OrderItem[] = [];
  private _cryptoStore = new CryptoStorage('salami1996');

  constructor() {
    this._getLocal();
  }

  quantity(): Observable<number> {
    return new Observable<number>(observer => {
      observer.next(this._quantity);
      this._qttObserver = observer;
    });
  }

  order(): Observable<OrderItem[]> {
    return new Observable<OrderItem[]>(observer => {
      observer.next(this._orderItems);
      this._orderObserver = observer;
    });
  }

  add2Cart(item: OrderItem) {
    this._quantity += item.quantity;
    this._orderItems.push(item);
    this._qttObserver.next(this._quantity);
    this._saveLocal();
  }

  getItems(): OrderItem[] {
    return this._orderItems;
  }

  clear() {
    this._cryptoStore.clear();
    this._setOrderItems([]);
    this._setQuantity(0);
  }

  private async _saveLocal() {
    await this._cryptoStore.set('cartItems', JSON.stringify(this._orderItems));
    await this._cryptoStore.set('quantity', JSON.stringify(this._quantity));
  }
  private _getLocal() {
    this._cryptoStore.get('cartItems').then(items => {
      if (items) {
        this._setOrderItems(JSON.parse(items));
      }
    });
    this._cryptoStore.get('quantity').then(qtt => {
      if (qtt) {
        this._setQuantity(JSON.parse(qtt));
      }
    });
  }
  private _setQuantity(val: number) {
    this._quantity = val;
    this._qttObserver.next(val);
  }
  private _setOrderItems(items: OrderItem[]) {
    this._orderItems = items;
    this._orderObserver.next(items);
  }

}
