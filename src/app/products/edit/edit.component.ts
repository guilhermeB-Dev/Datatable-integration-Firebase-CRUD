import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { ServicesDataService } from '../../services/services-data.service';
import { Product } from 'src/app/modules/product';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  product: Product;
  key: string = '';

  types = ['Tipo 1', 'Tipo 2', 'Tipo 3', 'Outros'];

  constructor(
    private _servicesService: ServicesService,
    private _servicesDataService: ServicesDataService
  ) {}

  ngOnInit() {
    this.newRegister();
  }

  newRegister(){
    this.product = new Product();
    this._servicesDataService.productAtual.subscribe(data => {
      if ( data.product && data.key ) {
        this.product = new Product();
        this.product.code = data.product.code;
        this.product.name = data.product.name;
        this.product.dropdown = data.product.dropdown;
        this.product.value = data.product.value;
        this.product.text = data.product.text;
        this.key = data.key;
      }
    });
  }

  onSubmit() {
    if (this.key) {
      this._servicesService.update(this.product, this.key);
    } else {
      this._servicesService.insert(this.product);
    }

    this.product = new Product();
    this.key = null;
  }
}