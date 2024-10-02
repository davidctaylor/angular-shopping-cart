import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductState } from '@shop/core-data';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  selector: 'app-purchase-control-bar',
  standalone: true,
  templateUrl: './purchase-control-bar.component.html',
  styleUrls: ['./purchase-control-bar.component.scss'],
})
export class PurchaseControlbarComponent implements OnInit {
  @Input() public filterActive: boolean = true;
  @Input() public set productState(state: ProductState | undefined) {
    this._productState = state;
    this.cartValue =
      this.productState?.selected.reduce((a: number, b) => (a += b.price), 0) ||
      0;
  }
  get productState(): ProductState | undefined {
    return this._productState;
  }

  public cartValue = 0;

  protected _productState?: ProductState;

  public ngOnInit(): void {
    this.cartValue =
      this.productState?.selected.reduce((a: number, b) => (a += b.price), 0) ||
      0;
  }
}
