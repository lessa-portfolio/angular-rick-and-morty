import { Observable, map, tap } from 'rxjs';
import { CaractersAPIResponse, Info, Result } from './interfaces/caracters.interfaces';
import { RickAndMortyService } from './services/rick-and-morty.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public response: Observable<CaractersAPIResponse>;

  // public info: Observable<Info>;
  // public caracters: Observable<Result[]>;

  // public info: Info;
  // public caracters: Result[] = [];

  constructor(private service: RickAndMortyService) {
    this.response = this.service.getCharacters();
    // this.service.getCharacters().pipe(
    //   tap(response => this.info = response.info),
    //   tap(response => this.caracters = response.results)
    // );

    // this.caracters = this.service.getCharacters().pipe(
    //   map(response => response.results)
    // );

    // this.info = this.service.getCharacters().pipe(
    //   map(response => response.info)
    // );
  }
}
