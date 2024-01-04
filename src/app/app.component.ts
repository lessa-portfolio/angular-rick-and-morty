import { Component, ElementRef } from '@angular/core';
import { RickAndMortyService } from './services/rick-and-morty.service';
import { Info, Result } from './interfaces/caracters.interfaces';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
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
