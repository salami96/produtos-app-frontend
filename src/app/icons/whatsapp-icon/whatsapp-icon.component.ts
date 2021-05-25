import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'i-whatsapp',
  templateUrl: './whatsapp-icon.component.html',
  styleUrls: ['./whatsapp-icon.component.css']
})
export class IconWhatsappComponent implements OnInit {
  @Input() size: string

  constructor() { }

  ngOnInit() {
    if (!this.size) {
      this.size = '24px';
    }
  }

}
