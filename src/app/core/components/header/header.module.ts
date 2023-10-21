import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SearchInputModule } from 'src/app/components/search-input/search-input.module';
import { SmallButtonModule } from 'src/app/components/small-button/small-button.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SmallButtonModule,
    SearchInputModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
