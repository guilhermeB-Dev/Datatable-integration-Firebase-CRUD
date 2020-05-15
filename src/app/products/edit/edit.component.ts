import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { ServicesDataService } from '../../services/services-data.service';
import { Product } from 'src/app/modules/product';
import { Router } from '@angular/router';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  product: Product;
  key: string = '';

  types = ['Tipo 1', 'Tipo 2', 'Tipo 3', 'Outros'];

  constructor(
    private _servicesService: ServicesService,
    private _servicesDataService: ServicesDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.product = new Product();
    this.newRegister();
  }

  newRegister(){
    if (this._servicesDataService.productAtual == null) return;

    this._servicesDataService.productAtual.subscribe((data) => {
      if (!data.product || !data.key) return;
      this.product = this.setValues(this.product, data.product);
      this.key = data.key;
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

  back(){
    this.router.navigate(['list']);
  }

  setValues(origin, destiny) {
    for (let [key, value] of Object.entries(origin)) {
      destiny[key] = value;
    }
    return destiny;
  }
}