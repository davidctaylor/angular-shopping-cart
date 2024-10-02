import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { DummyProduct } from '../../http/products/interfaces';
import { ProductsHttpService } from '../../http/products/products-http.service';
import { ProductState } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsStateService {
  protected _productState: BehaviorSubject<ProductState> =
    new BehaviorSubject<ProductState>({
      filter: undefined,
      products: [],
      selected: [],
      total: 0,
    });

  constructor(protected _productsHttpService: ProductsHttpService) {}

  public products(): Observable<ProductState> {
    return this._productState.asObservable().pipe(
      map((state) => {
        if (!state.filter) {
          return state;
        }

        return {
          ...state,
          products: state.products.filter((product) => {
            // there is no 'name' field
            return product.title.toLowerCase().includes(state.filter as string);
          }),
        };
      }),
    );
  }

  public filter(filter: string | undefined) {
    this._productState.next({
      ...this._productState.value,
      filter: filter?.toLocaleLowerCase(),
    });
  }

  public select(product: DummyProduct) {
    this._productState.next({
      ...this._productState.value,
      selected: [product, ...this._productState.value.selected].sort(
        (a, b) => b.id - a.id
      ),
    });
  }

  public remove(product: DummyProduct) {
    let found = false;
    this._productState.next({
      ...this._productState.value,
      selected: [
        ...this._productState.value.selected.reduce((a: DummyProduct[], b) => {
          if (!found && b.id === product.id) {
            found = true;
            return a;
          }
          a.push(b);
          return a;
        }, []),
      ],
    });
  }

  public load(): Observable<DummyProduct[]> {
    return this._productsHttpService.getProducts().pipe(
      take(1),
      tap((resp) =>
        this._productState.next({
          ...this._productState.value,
          products: [...resp],
          total: resp.length,
        })
      ),
    );
  }
}
