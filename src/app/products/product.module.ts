import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { FormsModule } from '@angular/forms';
import { ProductRoutingModule, ProductRoutedModule } from './product-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    ProductsComponent,
    ...ProductRoutedModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    NgxDatatableModule
  ]
})
export class ProductModule { }
