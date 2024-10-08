import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';


@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    ProductListComponent,
  ]
})
export class StoreModule { }
