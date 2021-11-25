import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StateButton } from './button/state.button';

@NgModule({
  imports: [CommonModule],
  declarations: [StateButton],
  exports: [StateButton],
})
export class SharedModule {}