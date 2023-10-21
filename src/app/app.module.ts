import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchInputModule } from './components/search-input/search-input.module';
import { DrawerModule } from './components/drawer/drawer.module';
import { SmallButtonModule } from './components/small-button/small-button.module';
import { ButtonModule } from './components/button/button.module';
import { DropdownModule } from './components/dropdown/dropdown.module';
import { CardModule } from './components/card/card.module';
import { FooterModule } from "./core/components/footer/footer.module";
import { HeaderModule } from './core/components/header/header.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        CardModule,
        DrawerModule,
        DropdownModule,
        ButtonModule,
        SearchInputModule,
        SmallButtonModule,
        HeaderModule,
        FooterModule
    ]
})
export class AppModule { }
