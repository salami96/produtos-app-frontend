import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  address: Address;
  error = {
    name: false,
    street: false,
    number: false,
    district: false,
    city: false,
    state: false,
    complement: false,
    reference: false,
    zipCode: false
  };
  loading = false;

  constructor(
    private uService: UserService,
  ) { }

  ngOnInit() {
  }

  focus(field: string) {
    document.getElementById(field).focus();
  }

  save() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  }

  clear() {}

}
