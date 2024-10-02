import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DummyProduct } from '@shop/core-data';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() public product!: DummyProduct;
  @Input() public set selectedProducts(p: DummyProduct[]) {
    this.seletectCount = p.reduce((a, b) => {
      return a += b.id === this.product.id ? 1 : 0;
    }, 0);
  };
  @Input() public filterActive: boolean = true;
  public seletectCount = 0;

  public filterControl: FormControl<string> = new FormControl();

  @Output() public selectEvent: EventEmitter<{selected: boolean, product:  DummyProduct}> = new EventEmitter();

  public ngOnInit(): void {

  }
  public onClickCard(type: 'add' | 'remove') {
    this.selectEvent.emit({selected: type === 'add', product: this.product})
  }
}