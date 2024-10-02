import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DummyProduct } from './interfaces';

const PRODUCTS_URL = 'https://dummyjson.com/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsHttpService {
  constructor(protected _http: HttpClient) {}

  public getProducts(): Observable<DummyProduct[]> {
    return this._http
      .get<{ products: DummyProduct[] }>(PRODUCTS_URL)
      .pipe(map((resp) => resp.products));
  }
}
