import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { blue, green, red, brown } from './theme/themes';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'Supermercado Copac';

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
      const active = 'green';

      // tslint:disable-next-line:forin
      for (const key in obj[active].properties) {
        document.querySelector('body').style.setProperty(key, obj[active].properties[key]);
      }
      document.querySelector('body').style.setProperty('background-color', obj[active].properties['--background']);
    }
  }
}
