import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  canLoad = false;
  inProducts: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformID: Object,
    private service: StoreService,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      this.canLoad = true;
    }
  }

}
