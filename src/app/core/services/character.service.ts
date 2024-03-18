import { BehaviorSubject, Observable, delay, tap } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { HttpClientService } from '../../shared/services/http-client.service';
import {
  CaractersAPIResponse,
  Info,
  Character,
} from '../models/caracters.interfaces';

const CHARACTERS_API_URL = 'https://rickandmortyapi.com/api/character/';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends HttpClientService<CaractersAPIResponse> {
  private _infoSubject = new BehaviorSubject<Info>(Info.fromJson({}));
  private _charactersSubject = new BehaviorSubject<Character[]>([]);

  private _name = new BehaviorSubject<string[]>([]);
  private _status = new BehaviorSubject<string[]>([]);
  private _species = new BehaviorSubject<string[]>([]);
  private _gender = new BehaviorSubject<string[]>([]);
  private _type = new BehaviorSubject<string[]>([]);

  constructor(protected override injector: Injector) {
    super(CHARACTERS_API_URL, injector, CaractersAPIResponse.fromJson);
  }

  public fetchCharacters(): Observable<CaractersAPIResponse> {
    return this.getResource().pipe(
      delay(1000),
      tap((response) => this.updateInfo(response.info)),
      tap((response) => this.updateCharacters(response.results))
    );
  }

  // public loadMoreCharacteres() {
  //   console.log('mais caracteres');
  //   this.backendService.getNextPageOfCharacteres(this._info.value.next, this.getFilters()).subscribe(response => {
  //     const currentResults = this._results.getValue();
  //     const newResults = currentResults.concat(response.results);

  //     this._results.next(newResults);
  //     this._info.next(response.info);
  //   });
  // }

  public getFilters(): any {
    return {
      name: this._name.value,
      status: this._status.value,
      species: this._species.value,
      gender: this._gender.value,
      type: this._type.value,
      location: [],
      origin: [],
    };
  }

  public clearFilters(): void {
    this._name.next([]);
    this._status.next([]);
    this._species.next([]);
    this._gender.next([]);
    this._type.next([]);
  }

  //  ==========  getters  ==========  //
  get info$(): Observable<Info> {
    return this._infoSubject.asObservable();
  }

  get characters$(): Observable<Character[]> {
    return this._charactersSubject.asObservable();
  }

  get name$(): Observable<string[]> {
    return this._name.asObservable();
  }

  get status$(): Observable<string[]> {
    return this._status.asObservable();
  }

  get species$(): Observable<string[]> {
    return this._species.asObservable();
  }

  get gender$(): Observable<string[]> {
    return this._gender.asObservable();
  }

  get type$(): Observable<string[]> {
    return this._type.asObservable();
  }

  //  ==========  setters  ==========  //
  set name(values: string[]) {
    this._name.next(values);
  }

  set status(values: string[]) {
    this._status.next(values);
  }

  set species(values: string[]) {
    this._species.next(values);
  }

  set gender(values: string[]) {
    this._gender.next(values);
  }

  set type(values: string[]) {
    this._type.next(values);
  }

  private updateInfo(info: Info) {
    this._infoSubject.next(info);
  }

  private updateCharacters(characters: Character[]) {
    this._charactersSubject.next(characters);
  }
}

// .subscribe({
//   next: (response) => {
//     this._info.next(response.info)
//     console.log(response)
//     this._charecters.next(response.results)

//     console.log(this._info.value)
//     console.log(this._charecters.value)
//   }
// });

// let params = new HttpParams();
//
// if (filter.name && filter.name.length > 0) {
//   params = params.set('name', filter.name.join(','));
// }
// if (filter.status && filter.status.length > 0) {
//   params = params.set('status', filter.status.join(','));
// }
// if (filter.species && filter.species.length > 0) {
//   params = params.set('species', filter.species.join(','));
// }
// if (filter.type && filter.type.length > 0) {
//   params = params.set('type', filter.type.join(','));
// }
// if (filter.gender && filter.gender.length > 0) {
//   params = params.set('gender', filter.gender.join(','));
// }
