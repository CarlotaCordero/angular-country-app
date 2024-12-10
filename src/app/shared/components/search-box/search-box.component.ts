import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debounce: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debounce
    .pipe(
      debounceTime( 200 )
    )
    .subscribe( value => this.onDebounce.emit( value ) );
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  emitValue( value: string ): void {
    this.onValue.emit( value );
  }

  onKeyPress( searchValue: string ): void {
    this.debounce.next( searchValue );
  }

}
