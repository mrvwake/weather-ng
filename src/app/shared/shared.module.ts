import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StateButton } from './button/state.button';
import { Typeahead } from './typeahead/typeahead.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [StateButton, Typeahead],
  exports: [StateButton, Typeahead],
})
export class SharedModule {}