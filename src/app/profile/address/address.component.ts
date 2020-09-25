import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    zipCode: false
  };
  complement = false;
  reference = false;
  loading = false;
  action: string;
  loadingZipCode = false;
  page: string;

  constructor(
    private uService: UserService,
    @Inject(PLATFORM_ID) private platformID: Object,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      document.querySelector('nav').style.setProperty('box-shadow', 'none');
      this.init();
    }
  }

  focus(field: string) {
    document.getElementById(field).focus();
  }

  validate() {
    let valid = true;
    if (this.address.zipCode.length !== 8) {
      this.error.zipCode = true;
      valid = false;
    }
    if (!this.address.street) {
      this.error.street = true;
      valid = false;
    }
    if (!this.address.number) {
      this.error.number = true;
      valid = false;
    }
    if (!this.address.district) {
      this.error.district = true;
      valid = false;
    }
    if (!this.address.city) {
      this.error.city = true;
      valid = false;
    }
    if (!this.address.state) {
      this.error.state = true;
      valid = false;
    }
    if (!this.address.name) {
      this.error.name = true;
      valid = false;
    }
    return valid;
  }

  save() {
    this.clearErrors();
    if (this.validate()) {
      this.loading = true;
      this.uService.address(this.address, this.page).then(resp => {
        this.clearErrors();
      });
    }
  }

  zipCodeApi() {
    const aux = this.address.zipCode;
    if (aux.length === 8) {
      this.loadingZipCode = true;
      this.uService.zipRequest(aux).subscribe((resp: any) => {
        this.loadingZipCode = false;
        this.address.city = resp.localidade;
        this.address.state = resp.uf;
        if (resp.logradouro) {
          this.address.street = resp.logradouro;
        }
        if (resp.bairro) {
          this.address.district = resp.bairro;
        }
      }, error => console.log(error));
      this.error.zipCode = false;
    } else {
      this.error.zipCode = true;
    }
  }

  init() {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.page = this.route.snapshot.queryParamMap.get('origem') || 'perfil';
    if (localStorage[id]) {
      this.action = 'Editar';
      this.address = JSON.parse(localStorage[id]);
      this.reference = this.address.reference !== '';
      this.complement = this.address.complement !== '';
    } else {
      this.action = 'Adicionar';
      this.address = {
        name: '',
        street: '',
        number: '',
        district: '',
        city: '',
        state: '',
        zipCode: '',
        complement: '',
        reference: ''
      };
      this.complement = false;
      this.reference = false;
    }
    this.clearErrors();
  }

  clearErrors() {
    this.error = {
      name: false,
      street: false,
      number: false,
      district: false,
      city: false,
      state: false,
      zipCode: false
    };
    this.loading = false;
    this.loadingZipCode = false;
  }
}
