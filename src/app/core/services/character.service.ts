import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import {
  CaractersAPIResponse,
  Info,
  Character,
} from '../models/caracters.interfaces';
import { FilterService } from './filter.service';
import { IFilter } from '../models/filter.interface';

const CHARACTERS_API_URL = 'https://rickandmortyapi.com/api/character/';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends HttpClientService<CaractersAPIResponse> {
  private _infoSubject = new BehaviorSubject<Info>(Info.fromJson({}));
  private _charactersSubject = new BehaviorSubject<Character[]>([]);

  constructor(
    protected override injector: Injector,
    private filterService: FilterService
  ) {
    super(CHARACTERS_API_URL, injector, CaractersAPIResponse.fromJson);
    this.filterService.filter$.subscribe((filter) => {
      this.getCharacters(filter).subscribe();
    });
  }

  public getCharacters(filter?: IFilter): Observable<CaractersAPIResponse> {
    return this.getResource(filter).pipe(
      tap((response) => this.updateInfo(response.info)),
      tap((response) => this.updateCharacters(response.results))
    );
  }

  public loadMoreCharacters(): Observable<CaractersAPIResponse> {

    let filter = this.filterService.getFilterSetted();
    console.log('mais caracteres', filter);

    if (this._infoSubject.value.next !== null) {
      this.filterService.nextPage();
    }

    return this.getResource(filter).pipe(
      tap((response) => this.updateInfo(response.info)),
      tap((response) => {
        const currentCharacters = this._charactersSubject.getValue();
        console.log('currentCharacters', currentCharacters);

        const allCharacters = currentCharacters.concat(response.results);
        console.log('allCharacters', allCharacters);

        this.updateCharacters(allCharacters);
      })
    );
  }

  //  ==========  getters  ==========  //
  get info$(): Observable<Info> {
    return this._infoSubject.asObservable();
  }

  get characters$(): Observable<Character[]> {
    return this._charactersSubject.asObservable();
  }

  private updateInfo(info: Info) {
    this._infoSubject.next(info);
  }

  private updateCharacters(characters: Character[]) {
    this._charactersSubject.next(characters);
  }
}
