import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { blue, green, red, brown } from '../theme/themes';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  active = 'green';
  obj = {
    blue,
    green,
    red,
    brown
  };

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      document.querySelector('nav').style.setProperty('box-shadow', 'none');
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
