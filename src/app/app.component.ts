import { Observable, map } from 'rxjs';
import { Result } from './interfaces/caracters.interfaces';
import { RickAndMortyService } from './services/rick-and-morty.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // @ts-ignore
  public caracters: Observable<Result[]>;

  constructor(private service: RickAndMortyService) { }

  ngOnInit(): void {
    this.getCaracters();
  }

  private getCaracters() {
    this.caracters = this.service.getCharacters().pipe(
      map(response => response.results)
    )
  }
}
