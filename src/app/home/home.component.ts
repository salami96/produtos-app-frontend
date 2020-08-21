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
      document.querySelector('nav').style.setProperty('box-shadow', 'none');
      this.canLoad = true;
      this.map = this.sanitizer.bypassSecurityTrustResourceUrl(this.store.map + '&output=embed');
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
