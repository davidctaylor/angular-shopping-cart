import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductState } from '@shop/core-data';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  selector: 'app-filter-control-bar',
  standalone: true,
  templateUrl: './filter-control-bar.component.html',
  styleUrls: ['./filter-control-bar.component.scss']
})
export class FilterControlbarComponent implements OnInit, OnDestroy {

  @Input() public filterActive: boolean = true;
  @Input() public productState?: ProductState;

  public filterControl: FormControl<string> = new FormControl();

  @Output() public filterEvent: EventEmitter<string> = new EventEmitter();

  protected _destroySubject: Subject<void> = new Subject<void>();

  public ngOnInit() {
    if (!this.filterActive) {
      return;
    }
    
    this.productState?.filter && this.filterControl.setValue(this.productState.filter);
    this.filterControl.valueChanges.pipe(
      takeUntil(this._destroySubject),
      debounceTime(50),
      tap((value) => this.filterEvent.emit(value))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this._destroySubject.next();
    this._destroySubject.complete();
  }
}