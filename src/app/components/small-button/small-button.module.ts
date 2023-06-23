import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallButtonComponent } from './small-button.component';

@NgModule({
  declarations: [
    SmallButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SmallButtonComponent
  ]
})
export class SmallButtonModule { }
