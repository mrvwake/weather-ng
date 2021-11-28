import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

enum ButtonState {
  NORMAL,
  LOADING,
  DONE,
}
@Component({
  selector: 'state-button',
  styleUrls: ['./state.button.css'],
  templateUrl: './state.button.html',
})
export class StateButton implements OnInit, OnChanges, OnDestroy {
  @Input() handler: Observable<any>;
  @Output() action: EventEmitter<any> = new EventEmitter();
  private subscription: Subscription;
  
  states = ButtonState;
  state: ButtonState;
  
  private setState(value) {
    this.state = value;
  }

  ngOnInit() {
    this.setState(ButtonState.NORMAL);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.handler && changes.handler.previousValue !== changes.handler.currentValue) {
      if(this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = null;
      }
      this.subscription = this.handler
      .pipe(
        delay(500),
        tap(() => (this.setState(ButtonState.DONE))),
        delay(500)
      )
      .subscribe(() => {
        this.setState(ButtonState.NORMAL);
      });
    }
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  public onClick($event: PointerEvent) {
    if (this.state !== ButtonState.NORMAL) return;
    this.state = ButtonState.LOADING;
    this.action.emit($event);
  }
}