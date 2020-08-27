import { Component, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.css']
})
export class CategoryButtonComponent implements OnInit {
  @Input() icon: string;
  safeHtml: SafeHtml;
  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformID: Object,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.icon);
    }
  }

}
