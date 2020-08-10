import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  store: Store;

  constructor() {
    this.store = {
      title: 'Doçuras da Nick',
      logo: 'https://scontent.fpoa11-1.fna.fbcdn.net/v/t1.0-9/104841876_102569048186490_8577872177362638693_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=rR6KLcp4v_oAX9EJhvH&_nc_ht=scontent.fpoa11-1.fna&oh=744f98c3e95717945ba9ad2ad404ad1b&oe=5F5942C2',
      slogan: 'Você merece adoçar a sua vida ❤',
      phone: '51 998446478',
      whatsapp: 'https://wa.me/5551998446478',
      fb: 'https://www.facebook.com/Do%C3%A7uras-da-Nick-102567374853324',
      insta: 'https://www.instagram.com/nickdocurasda/',
      email: 'nicolelopes7777@gmail.com',
      address: 'Núcleo F-49, 59, Aços Finos Piratini - Charqueadas, RS',
      lat: '-29.9647483',
      long: '-51.611617,19',
      payments: [{
        name: 'Dinheiro',
        icon: '<i-dollar-sign></i-dollar-sign>'
      }],
      ship: 0,
    };
  }
}
