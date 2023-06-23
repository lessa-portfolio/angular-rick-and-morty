import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchInputModule } from './components/search-input/search-input.module';
import { DrawerModule } from './components/drawer/drawer.module';
import { SmallButtonModule } from './components/small-button/small-button.module';
import { ButtonModule } from './components/button/button.module';
import { DropdownModule } from './components/dropdown/dropdown.module';
import { CardModule } from './components/card/card.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CardModule,
    DrawerModule,
    DropdownModule,
    ButtonModule,
    SearchInputModule,
    SmallButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
