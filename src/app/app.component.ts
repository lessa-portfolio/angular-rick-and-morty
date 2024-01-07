import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { RickAndMortyService } from './core/services/rick-and-morty.service';
import { Info, Result } from './core/models/caracters.interfaces';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';

import { CardComponent } from './shared/components/card/card.component';
import { ButtonComponent } from './shared/components/button/button.component';

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

  constructor(private rickAndMortyService: RickAndMortyService) {
    this.info$ = this.rickAndMortyService.info$;
    this.characters$ = this.rickAndMortyService.results$;
  }

  public clickOnLoadMoreButton() {
    this.rickAndMortyService.loadMoreCharacteres();
  }
}
