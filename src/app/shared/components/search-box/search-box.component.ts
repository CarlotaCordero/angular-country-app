import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncerSubscription?: Subscription;

  private debounce: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  onDebounce = new EventEmitter<string>();

  emitValue( value: string ): void {
    this.onValue.emit( value );
  }

  onKeyPress( searchValue: string ): void {
    this.debounce.next( searchValue );
  }

  ngOnInit(): void {
    this.debouncerSubscription = this.debounce
    .pipe(
      debounceTime( 300 )
    )
    .subscribe( value => this.onDebounce.emit( value ) );
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

}
