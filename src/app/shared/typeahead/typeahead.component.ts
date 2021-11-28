import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'typeahead',
  styleUrls: ['./typeahead.component.css'],
  templateUrl: './typeahead.component.html',
})
export class Typeahead implements OnInit, OnChanges, OnDestroy {
  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public options: string[];
  @Input() public type: string = "text";

  @Output() select: EventEmitter<string> = new EventEmitter();

  private subscription: Subscription;
  
  optionsFiltered = [];
  value = '';
  hasFocus = false;
  list$: Subject<string> = new Subject();

  ngOnInit() {
    this.subscription = this.list$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((keys) => of(this.getFilterData(keys)))
    ).subscribe((value) => {
      this.optionsFiltered = value;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.options) {
      this.optionsFiltered = [...this.options];
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  inputChange(event: InputEvent) { 
    if(!event?.target) return;

    if(!event.target['value'] || event.target['value'].length === 0) {
      this.optionsFiltered = [...this.options];
    }

    this.list$.next(event.target['value']);
  }

  private getFilterData(keys: string) {
    return this.options.filter((e:string) => e.toLowerCase().includes(keys.toLowerCase()));
  }

  selected(option: string) {
    this.value = option;
    this.hasFocus = true;
    this.select.emit(this.value);
  }

}