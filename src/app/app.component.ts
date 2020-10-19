import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { colors } from './theme/themes';
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
  img: string;

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
      this.img = 'assets/banner.png';
      this.setColor('blue');
      this.url = window.location.host.split('.')[0];
      let code: string;

      code = this.url;

      if (
        this.url.includes('localhost') ||
        this.url.includes('www') ||
        this.url.includes('1') ||
        this.url.includes('produtos-app')
      ) {
        code = 'nick';
      }

      // this.observer.push(
      this.sService.loadStore(code, this.cb); /* store => {
          this.setStoreData(store);
        });*/
      // );

      // this.sService.getStore().then(store => {
      //   this.setStoreData(store);
      // });

    }
  }

  setColor(active: string) {
    // tslint:disable-next-line:forin
    for (const key in colors[active].properties) {
      document.querySelector('body').style.setProperty(key, colors[active].properties[key]);
    }
    document.querySelector('body').style.setProperty('background-color', colors[active].properties['--background']);

    return colors[active].properties['--dark'];
  }

  cb = (store: Store) => {
    this.title.setTitle(store.title);
    this.meta.updateTag({ name: 'keywords', content: store.code });
    this.meta.updateTag({ name: 'description', content: store.slogan });
    this.meta.updateTag({ name: 'theme-color', content: this.setColor(store.color) });
    this.meta.updateTag({ name: 'apple-mobile-web-app-capable', content: 'yes' });
    this.meta.updateTag({ name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' });
    this.meta.updateTag({ property: 'og:url', content: `https://${store.code}.produtos.app` });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: store.title });
    this.meta.updateTag({ property: 'og:description', content: store.slogan });
    this.meta.updateTag({ property: 'og:image', content: store.logo, itemprop: 'image' });
  }
}
