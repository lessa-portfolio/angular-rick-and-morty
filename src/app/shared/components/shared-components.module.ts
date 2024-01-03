import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallButtonComponent } from './small-button/small-button.component';
import { ButtonComponent } from './button/button.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { CardComponent } from './card/card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SmallButtonComponent,
    ButtonComponent,
    SearchInputComponent,
    DropdownComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SmallButtonComponent,
    ButtonComponent,
    SearchInputComponent,
    DropdownComponent,
    CardComponent
  ]
})
export class SharedComponentsModule { }
