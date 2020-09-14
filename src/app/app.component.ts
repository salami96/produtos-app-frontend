import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { blue, green, red, brown } from './theme/themes';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'produtos.app';
  url: string;
  landing = false;

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      const obj = {
        blue,
        green,
        red,
        brown
      };
      let active: string;

      this.url = window.location.host.split('.')[0];

      switch (this.url) {
        case 'nick':
          active = 'brown';
          break;
        case 'agroking':
          active = 'blue';
          break;
        default:
          active = 'green';
          // this.landing = true;
          break;
      }


      // tslint:disable-next-line:forin
      for (const key in obj[active].properties) {
        document.querySelector('body').style.setProperty(key, obj[active].properties[key]);
      }
      document.querySelector('body').style.setProperty('background-color', obj[active].properties['--background']);
    }
  }
}
