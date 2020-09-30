import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
// import { CryptoStorage } from '@webcrypto/storage/';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _quantity = 0;
  private _qttObserver: Subscriber<number>;
  private _orderObserver: Subscriber<OrderItem[]>;
  private _orderItems: OrderItem[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object,
  ) {
    this.quantity().subscribe();
    this.order().subscribe();
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
    this._saveLocal();
  }

  rmFromCart(item: OrderItem, i: number) {
    this._quantity -= item.quantity;
    this._orderItems.splice(i, 1);
    this._saveLocal();
  }

  updateCart(item: OrderItem, i: number) {
    this._quantity -= this._orderItems[i].quantity;
    this._quantity += item.quantity;
    this._orderItems[i] = item;
    this._saveLocal();
  }

  getItems(): OrderItem[] {
    return this._orderItems;
  }

  clear() {
    // this._cryptoStore.clear();
    localStorage.clear();
    this._setOrderItems([]);
    this._setQuantity(0);
  }

  private async _saveLocal() {
    this._qttObserver.next(this._quantity);
    this._orderObserver.next(this._orderItems);
    localStorage.setItem('cartItems', JSON.stringify(this._orderItems));
    // await this._cryptoStore.set('cartItems', JSON.stringify(this._orderItems));
    // await this._cryptoStore.set('quantity', JSON.stringify(this._quantity));
    localStorage.setItem('quantity', JSON.stringify(this._quantity));
  }
  private _getLocal() {
    if (isPlatformBrowser(this.platformID)) {
      const { cartItems, quantity } = localStorage;
      if (cartItems) {
        this._setOrderItems(JSON.parse(cartItems));
      }
      if (quantity) {
        this._setQuantity(JSON.parse(quantity));
      }
    } else if (isPlatformServer(this.platformID)) {
      this._setOrderItems([]);
      this._setQuantity(0);
    }
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
