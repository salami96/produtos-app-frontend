import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  _quantity = 0;
  _qttObserver;
  _order: OrderItem[] = [];
  _orderObserver;

  constructor() {
    this.order().subscribe();
  }

  quantity(): Observable<number> {
    return new Observable<number>(observer => {
      this._qttObserver = observer;
    });
  }
  order(): Observable<OrderItem[]> {
    return new Observable<OrderItem[]>(observer => {
      this._orderObserver = observer;
    });
  }

  add2Cart(item: OrderItem) {
    this._quantity += item.quantity;
    this._order.push(item);
    this._qttObserver.next(this._quantity);
    this._orderObserver.next(this._order);
  }
}
