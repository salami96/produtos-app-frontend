import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  canLoad = false;

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      this.canLoad = true;
    }
  }

}
