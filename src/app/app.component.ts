import { Component, HostListener, ElementRef } from '@angular/core';
import { RickAndMortyService } from './services/rick-and-morty.service';
import { Info, Result } from './interfaces/caracters.interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public info$: Observable<Info>;
  public characters$: Observable<Result[]>;

  public isFixed: boolean = false;

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

  public handleSearchInput(value: string) {
    this.rickAndMortyService.name = [value];
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkScrollPosition();
  }

  checkScrollPosition() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollTop > 240) {
      this.isFixed = true;
    } else {
      this.isFixed = false;
    }
  }
}
