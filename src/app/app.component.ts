import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { blue, green, red, brown, orange, pink, purple } from './theme/themes';
import { isPlatformBrowser } from '@angular/common';
import { StoreService } from './services/store.service';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit, OnDestroy {
  url: string;
  landing = false;
  observer: Subscription[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object,
    private sService: StoreService,
    private title: Title,
    private meta: Meta,
  ) { }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.forEach(o => o.unsubscribe);
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {

      this.url = window.location.host.split('.')[0];
      let code: string;

      if (this.url.includes('localhost') ||
      this.url.includes('www') ) {
        code = 'exemplo';
      } else {
        code = this.url;
      }

      this.observer.push(
        this.sService.loadStore(code).subscribe(store => {
          this.setStoreData(store);
        })
      );

      // this.sService.getStore().then(store => {
      //   this.setStoreData(store);
      // });

    }
  }

  setStoreData(store: Store) {

    const obj = {
      blue,
      green,
      red,
      brown,
      purple,
      orange,
      pink
    };
    let active: string;


    active = store.color;

    // tslint:disable-next-line:forin
    for (const key in obj[active].properties) {
      document.querySelector('body').style.setProperty(key, obj[active].properties[key]);
    }
    document.querySelector('body').style.setProperty('background-color', obj[active].properties['--background']);

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
