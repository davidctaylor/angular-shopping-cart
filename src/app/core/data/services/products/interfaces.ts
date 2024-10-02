import { DummyProduct } from '../../http/products/interfaces';

export interface ProductState {
  filter: string | undefined;
  products: DummyProduct[];
  selected: DummyProduct[];
  total: number;
}