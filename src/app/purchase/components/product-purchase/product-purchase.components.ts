import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  DummyProduct,
  ProductsStateService,
  ProductState,
} from '@shop/core-data';
import {
  PurchaseControlbarComponent,
  ProductCardComponent,
  HeaderComponent,
} from '@shop/core-ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-product-purchase',
  imports: [
    CommonModule,
    PurchaseControlbarComponent,
    ProductCardComponent,
    HeaderComponent,
  ],
  standalone: true,
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.scss'],
})
export class ProductPurchaseComponent {
  public products$?: Observable<ProductState>;
  public uniqueProducts$?: Observable<DummyProduct[]>;

  constructor(protected _productsStateService: ProductsStateService) {
    this.products$ = this._productsStateService.products();
    this.uniqueProducts$ = this.products$.pipe(
      map((state) => {
        return Array.from(new Set(state.selected));
      })
    );
  }

  public onSelectEvent(event: any) {
    if (event.selected) {
      this._productsStateService.select(event.product);
    } else {
      this._productsStateService.remove(event.product);
    }
  }
}
