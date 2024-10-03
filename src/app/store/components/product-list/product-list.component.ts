import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, Observable, take } from 'rxjs';

import {
  FilterControlbarComponent,
  ProductCardComponent,
  HeaderComponent,
} from '@shop/core-ui';
import { ProductsStateService, ProductState } from '@shop/core-data';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-product-list',
  imports: [
    CommonModule,
    FilterControlbarComponent,
    ProductCardComponent,
    HeaderComponent,
  ],
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  public products$?: Observable<ProductState>;

  constructor(protected _productsStateService: ProductsStateService) {
    this.products$ = this._productsStateService.products();
  }

  public ngOnInit(): void {
    this._productsStateService
      .load()
      .pipe(
        take(1),
        catchError((err) => {
          console.log('Query error', err);
          return err;
        })
      )
      .subscribe();
  }

  public onFilterEvent(filter: string) {
    this._productsStateService.filter(filter);
  }

  public onSelectEvent(event: any) {
    if (event.selected) {
      this._productsStateService.select(event.product);
    } else {
      this._productsStateService.remove(event.product);
    }
  }
}
