import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { RickAndMortyService } from './services/rick-and-morty.service';
import { Info, Result } from './interfaces/caracters.interfaces';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';

import { CardComponent } from './shared/components/card/card.component';
import { ButtonComponent } from './shared/components/button/button.component';

// @ts-ignore
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    ButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public info$: Observable<Info>;
  public characters$: Observable<Result[]>;

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private elementRef: ElementRef
  ) {
    this.info$ = this.rickAndMortyService.info$;
    this.characters$ = this.rickAndMortyService.results$;
  }

  public clickOnLoadMoreButton() {
    this.rickAndMortyService.loadMoreCharacteres();
  }
}
