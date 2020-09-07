import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { blue, green, red, brown, pink } from '../theme/themes';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  active: string;
  obj = {
    blue,
    green,
    red,
    brown,
    pink
  };


  constructor(
    @Inject(PLATFORM_ID) private platformID: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {

    }
  }

  setActive(color: string) {
    this.active = color;
    // tslint:disable-next-line:forin
    for (const key in this.obj[this.active].properties) {
      document.querySelector('body').style.setProperty(key, this.obj[this.active].properties[key]);
    }
  }


}
