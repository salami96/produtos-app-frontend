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
  active: string;

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

      console.log(window.location.href);


      this.active = 'green';

      // tslint:disable-next-line:forin
      for (const key in obj[this.active].properties) {
        document.querySelector('body').style.setProperty(key, obj[this.active].properties[key]);
      }
      document.querySelector('body').style.setProperty('background-color', obj[this.active].properties['--background']);
    }
  }
}
