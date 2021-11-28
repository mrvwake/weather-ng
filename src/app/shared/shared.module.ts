import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StateButton } from './button/state.button';
import { SearchMatchDirective } from './directive/search.match.directive';
import { Typeahead } from './typeahead/typeahead.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [StateButton, Typeahead, SearchMatchDirective],
  exports: [StateButton, Typeahead, SearchMatchDirective],
})
export class SharedModule {}