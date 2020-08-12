import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  store: Store;
  products: Product[];
  size: Value;

  constructor() {
/*     this.store = {
      title: 'Doçuras da Nick',
      logo: 'https://scontent.fpoa11-1.fna.fbcdn.net/v/t1.0-9/104841876_102569048186490_8577872177362638693_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=rR6KLcp4v_oAX9EJhvH&_nc_ht=scontent.fpoa11-1.fna&oh=744f98c3e95717945ba9ad2ad404ad1b&oe=5F5942C2',
      slogan: 'Você merece adoçar a sua vida ❤',
      phone: '51 998446478',
      whatsapp: 'https://wa.me/5551998446478',
      fb: 'https://www.facebook.com/Do%C3%A7uras-da-Nick-102567374853324',
      insta: 'https://www.instagram.com/nickdocurasda/',
      email: 'nicolelopes7777@gmail.com',
      address: 'Núcleo F-49, 59, Aços Finos Piratini - Charqueadas, RS',
      map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d864.1276877082491!2d-51.611616970780524!3d-29.964748337026233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951bc144e0420b7b%3A0xf76269ba228bc30f!2sN%C3%BAcleo%20F-49%2C%2059%20-%20Vila%20Acos%20Finos%20Piratini%2C%20Charqueadas%20-%20RS%2C%2096745-000!5e0!3m2!1spt-BR!2sbr!4v1597266639560!5m2!1spt-BR!2sbr',
      directions: 'https://www.google.com/maps/dir//N%C3%BAcleo+F-49,+59+-+Vila+Acos+Finos+Piratini,+Charqueadas+-+RS,+96745-000/@-29.9647483,-51.611617,19z/data=!4m8!4m7!1m0!1m5!1m1!1s0x951bc144e0420b7b:0xf76269ba228bc30f!2m2!1d-51.6110698!2d-29.9647495',
      payments: [{
        name: 'Dinheiro',
        icon: '<i-dollar-sign></i-dollar-sign>'
      }],
      ship: 0,
    }; */
    this.store = {
      title: 'Supermercado Copac',
      logo: 'https://www.supercopac.com.br/assets/logo.png',
      slogan: 'Produtos saudáveis para a vida ❤',
      phone: '51 36584137',
      whatsapp: 'https://wa.me/555136584137',
      fb: 'https://www.facebook.com/supercopac',
      insta: 'https://www.instagram.com/supercopac/',
      email: 'supercopac@gmail.com',
      address: 'Av. Cruz de Malta, 705, Centro - Charqueadas, RS',
      map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2906.79725019802!2d-51.63228664688837!3d-29.956891851224437!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8b2261e53fcc3dfc!2sSupermercado%20Copac!5e0!3m2!1spt-BR!2sbr!4v1597268224073!5m2!1spt-BR!2sbr',
      directions: 'https://www.google.com/maps/dir//Supermercado+Copac+-+Av.+Cruz+de+Malta,+705+-+Centro,+Charqueadas+-+RS,+96745-000/@-29.9571827,-51.6315332,20z/data=!4m9!4m8!1m0!1m5!1m1!1s0x951bc11a8a8b3cdd:0x8b2261e53fcc3dfc!2m2!1d-51.631689!2d-29.957336!3e0',
      payments: [{
        name: 'Dinheiro',
        icon: '<i-dollar-sign></i-dollar-sign>'
      }],
      ship: 5,
    };

    this.size = {
      name: 'Grande',
      value: 15
    };

    this.products = [
      {
        store: 'askjdhajsdfkjsdjkfk',
        category: 'Bolos',
        name: 'Bolo de Cenoura',
        imgs: ['https://scontent.fbfh9-1.fna.fbcdn.net/v/t1.0-9/104841876_102569048186490_8577872177362638693_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=rR6KLcp4v_oAX-SM_JS&_nc_ht=scontent.fbfh9-1.fna&oh=927764607969c2d0ce29cee47c1ac4cb&oe=5F5942C2'],
        sizes: [ this.size ],
        unity: 'Tamanho'
      },
      {
        store: 'askjdhajsdfkjsdjkfk',
        category: 'Bolos',
        name: 'Bolo de Milho Cremoso',
        imgs: ['https://scontent.fbfh9-1.fna.fbcdn.net/v/t1.0-9/104841876_102569048186490_8577872177362638693_o.jpg?_nc_cat=109&_nc_sid=09cbfe&_nc_ohc=rR6KLcp4v_oAX-SM_JS&_nc_ht=scontent.fbfh9-1.fna&oh=927764607969c2d0ce29cee47c1ac4cb&oe=5F5942C2'],
        sizes: [ this.size ],
        unity: 'Tamanho'
      }
    ];
  }
}
