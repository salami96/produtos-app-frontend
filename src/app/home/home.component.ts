import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { StoreService } from '../services/store.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  canLoad = false;
  store: Store;
  map: SafeUrl;
  public innerWidth: any;
  observer: Subscription[] = [];

  constructor(
    // private uService: UserService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformID: Object,
    private service: StoreService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    if (this.service.selectedStore) {
      this.store = this.service.selectedStore;
      this.map = this.sanitizer.bypassSecurityTrustResourceUrl(this.store.map + '&output=embed');
    } else {
      this.observer.push(
        this.service.store.subscribe(resp => {
          this.store = resp;
          this.map = this.sanitizer.bypassSecurityTrustResourceUrl(this.store.map + '&output=embed');
        })
      );
    }
    if (isPlatformBrowser(this.platformID)) {
      document.querySelector('nav').style.setProperty('box-shadow', 'none');
      this.canLoad = true;
      this.innerWidth = window.innerWidth;
      window.onresize = () => {
        this.innerWidth = window.innerWidth;
      };
      /* this.route.params.subscribe(res => {
        if (res.data === 'cadastro') {
          const checkExist = setInterval(function() {
            if (document.readyState !== 'loading') {
              document.getElementById('cadastro').click();
              clearInterval(checkExist);
            }
          }, 100);
        }
      }); */
    }
  }

  /* animate(id: string, animationName: string, event: any) {
    if (event.type === 'mouseover') {
      const node = document.getElementById(id);
      node.classList.add('animated', animationName);
    }
    if (event.type === 'mouseout') {
      const node = document.getElementById(id);
      node.classList.remove('animated', animationName);
    }
  } */
  ngOnDestroy() {
    if (this.observer) {
      this.observer.forEach(o => o.unsubscribe());
    }
  }
}
