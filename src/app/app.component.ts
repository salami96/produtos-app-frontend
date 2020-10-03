import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { blue, green, red, brown } from './theme/themes';
import { isPlatformBrowser } from '@angular/common';
import { StoreService } from './services/store.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  url: string;
  landing = false;

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object,
    private sService: StoreService,
    private title: Title,
    private meta: Meta,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {

      this.url = window.location.host.split('.')[0];
      let code;

      if (this.url.includes('localhost') ||
        this.url.includes('www') ||
        this.url.includes('localhost')) {
          code = 'copac';
      } else {
        code = this.url;
      }

      this.sService.loadStore(code);

      this.sService.getStore().subscribe(resp => this.setStoreData(resp));
    }
  }

  setStoreData(store: Store) {
    const obj = {
      blue,
      green,
      red,
      brown
    };
    let active: string;

    active = store.color;
    // tslint:disable-next-line:forin
    for (const key in obj[active].properties) {
      document.querySelector('body').style.setProperty(key, obj[active].properties[key]);
    }
    document.querySelector('body').style.setProperty('background-color', obj[active].properties['--background']);

    console.log(this);

    this.title.setTitle(store.title);
    this.meta.updateTag({ name: 'keywords', content: store.code });
    this.meta.updateTag({ name: 'description', content: store.slogan });
    this.meta.updateTag({ property: 'og:url', content: store.code + '.produtos.app' });
    this.meta.updateTag({ property: 'og:type', content: 'product.item' });
    this.meta.updateTag({ property: 'og:title', content: store.title });
    this.meta.updateTag({ property: 'og:description', content: store.slogan });
    this.meta.updateTag({ property: 'og:image', content: store.logo, itemprop: 'image' });
  }
}
