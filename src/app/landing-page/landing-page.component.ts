import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { colors } from '../theme/themes';
import { isPlatformBrowser } from '@angular/common';
import { StoreService } from '../services/store.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  active: string;

  constructor(
    private sService: StoreService,
    @Inject(PLATFORM_ID) private platformID: Object,
    private title: Title,
    private meta: Meta,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {

    }
  }

  setActive(color: string) {
    this.active = color;
    // tslint:disable-next-line:forin
    for (const key in colors[this.active].properties) {
      document.querySelector('body').style.setProperty(key, colors[this.active].properties[key]);
    }
  }

  setStore(code: string) {
    this.sService.filterStore(code, this.cb);
  }

  cb = (store: Store) => {
    this.setActive(store.color);
    this.title.setTitle(store.title);
    this.meta.updateTag({ name: 'keywords', content: store.code });
    this.meta.updateTag({ name: 'description', content: store.slogan });
    // this.meta.updateTag({ name: 'theme-color', content: this.setColor(store.color) });
    this.meta.updateTag({ name: 'apple-mobile-web-app-capable', content: 'yes' });
    this.meta.updateTag({ name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' });
    this.meta.updateTag({ property: 'og:url', content: `https://${store.code}.produtos.app` });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: store.title });
    this.meta.updateTag({ property: 'og:description', content: store.slogan });
    this.meta.updateTag({ property: 'og:image', content: store.logo, itemprop: 'image' });
  }

}
