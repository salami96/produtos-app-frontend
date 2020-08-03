import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loadMap = false;

  constructor(
    // private uService: UserService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformID: Object
  ) {}

  ngOnInit() {
    // this.uService.ping().subscribe(resp => console.log(resp));
    if (isPlatformBrowser(this.platformID)) {
      this.loadMap = true;
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
