import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    :host {
      background: #f1f1f1;
      font-family: Roboto,"Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;
      font-display: swap;
    }
    .nav-links {
      background: #008591;
    }
    .nav-links a {
      color: #fff;
      display: inline-block;
      padding: 1rem;
      margin-right: 3rem;
      text-decoration: none;
      font-weight: bold;
      letter-spacing: 0.1rem;
    }
    .router-container {
      border: 0.5rem #00afc4 solid;
      padding: 2rem;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'Supermercado Copac';

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    // this.themeService.setTheme('brown');
  }
}
