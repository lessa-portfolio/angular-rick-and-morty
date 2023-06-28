import { Observable } from 'rxjs';
import { Info, Result } from './interfaces/caracters.interfaces';
import { RickAndMortyService } from './services/rick-and-morty.service';
import { Component } from '@angular/core';
import { newFilter } from './shared/filter.factory';
import { Filter } from './interfaces/filters.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public filters: Filter = newFilter();

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
