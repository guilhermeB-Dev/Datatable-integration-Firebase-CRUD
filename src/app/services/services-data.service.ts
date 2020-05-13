import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../modules/product';

@Injectable({
  providedIn: 'root',
})
export class ServicesDataService {
  constructor() {}

  private productSource = new BehaviorSubject({ product: null, key: '' });
  productAtual = this.productSource.asObservable();

  obtemProduct(product: Product, key: string) {
    this.productSource.next({ product: product, key: key });
    this.productAtual = this.productSource.asObservable();
  }

  clear() {
    this.productAtual = null;
  }
}
