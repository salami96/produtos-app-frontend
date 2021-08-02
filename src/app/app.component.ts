import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy, Optional } from '@angular/core';
import { colors } from './theme/themes';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { StoreService } from './services/store.service';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  url: string;
  landing = false;
  loading = true;
  observer: Subscription[] = [];
  img: string;

  constructor(
    @Optional() @Inject('request') private request: any,
    @Optional() @Inject('obj') private obj: any,
    @Inject(PLATFORM_ID) private platformID: Object,
    private sService: StoreService,
    private title: Title,
    private meta: Meta,
  ) { }

  ngOnInit() {
    let code: string;
    if (isPlatformBrowser(this.platformID)) {
      this.url = window.location.host.split('.')[0];

      code = this.url;

      if (
        this.url.includes('localhost') ||
        this.url.includes('www') ||
        this.url.includes('1') ||
        this.url.includes('produtos-app')
      ) {
        code = 'jadore';
      }

      this.sService.filterStore(code, this.cb);

    } else if (isPlatformServer(this.platformID)) {
      this.cb(this.obj);
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
    if (store) {
      this.title.setTitle(store.title);
      this.meta.updateTag({ name: 'keywords', content: store.code });
      this.meta.updateTag({ name: 'description', content: store.slogan });
      if (isPlatformBrowser(this.platformID)) {
        this.meta.updateTag({ name: 'theme-color', content: this.setColor(store.color) });
        if (store.favicon) {
          document.getElementById('favicon').setAttribute('href', store.favicon)
        }
      }
      this.meta.updateTag({ name: 'apple-mobile-web-app-capable', content: 'yes' });
      this.meta.updateTag({ name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' });
      this.meta.updateTag({ property: 'og:url', content: `https://${store.code}.produtos.app` });
      this.meta.updateTag({ property: 'og:type', content: 'product' });
      this.meta.updateTag({ property: 'og:title', content: store.title });
      this.meta.updateTag({ property: 'og:description', content: store.slogan });
      this.meta.updateTag({ property: 'og:image', content: store.logo, itemprop: 'image' });
      this.loading = false;
    }
  }
}
