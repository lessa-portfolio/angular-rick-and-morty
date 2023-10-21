import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { SmallButtonModule } from 'src/app/components/small-button/small-button.module';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    SmallButtonModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
