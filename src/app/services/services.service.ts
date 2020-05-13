import { Injectable } from '@angular/core';
import { Product } from '../modules/product';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private _angularFireDatabase: AngularFireDatabase) {}

  insert(Product: Product) {
    this._angularFireDatabase
      .list('productsList')
      .push(Product)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(Product: Product, key: string) {
    this._angularFireDatabase.list('productsList').update(key, Product);
  }

  async getAll() {
    return this._angularFireDatabase
      .list('productsList')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => ({
            key: c.payload.key,
            ...(c.payload.val() as any),
          }));
        })
      );
  }

  dalete(key: string) {
    this._angularFireDatabase.object(`productsList/${key}`).remove();
  }
}
