import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { StoreService } from '../services/store.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  canLoad = false;
  store: Store;
  map: SafeUrl;

  constructor(
    // private uService: UserService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformID: Object,
    private service: StoreService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.store = this.service.store;
    // this.uService.ping().subscribe(resp => console.log(resp));
    if (isPlatformBrowser(this.platformID)) {
      this.canLoad = true;
      this.map = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1294.8316396084465!2d
        ${this.store.long}!3d${this.store.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8b2261e53fcc3dfc!2s
        Supermercado+Copac!5e0!3m2!1spt-BR!2sbr!4v1540222183652`
      );
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
}
