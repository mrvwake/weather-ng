import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
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
export class StateButton {
  @Input() submitable: Observable<any>;

  public states = ButtonState;
  public state: ButtonState;

  constructor() {
    this.state = ButtonState.NORMAL;
  }

  public onClick() {
    if (this.state !== ButtonState.NORMAL) return;

    this.state = ButtonState.LOADING;
    
    this.submitable
      .pipe(
        delay(500),
        tap(() => (this.state = ButtonState.DONE)),
        delay(500)
      )
      .subscribe(() => {
        this.state = ButtonState.NORMAL;
      });

  }
}