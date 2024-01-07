import { BehaviorSubject, Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';
import { Info, Result } from '../models/caracters.interfaces';
import { newFilter, newInfo } from '../../shared/filter.factory';
import { Filter } from '../models/filters.interface';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private _info = new BehaviorSubject<Info>(newInfo());
  private _results = new BehaviorSubject<Result[]>([]);

  private _name = new BehaviorSubject<string[]>([]);
  private _status = new BehaviorSubject<string[]>([]);
  private _species = new BehaviorSubject<string[]>([]);
  private _gender = new BehaviorSubject<string[]>([]);
  private _type  = new BehaviorSubject<string[]>([]);

  constructor(private backendService: BackendService) {
    this.name$.subscribe(() => this.getInitialsData(this.getFilters()));

    this.getInitialsData(newFilter());
  }

  //  ==========  methods  ==========  //
  public getInitialsData(filters: Filter) {
    this.backendService.getCharacters(filters).subscribe(response => {
      this._info.next(response.info)
      this._results.next(response.results)
    });
  }

  public loadMoreCharacteres() {
    this.backendService.getNextPageOfCharacteres(this._info.value.next, this.getFilters()).subscribe(response => {
      const currentResults = this._results.getValue();
      const newResults = currentResults.concat(response.results);

      this._results.next(newResults);
      this._info.next(response.info);
    });
  }

  public getFilters(): Filter {
    return {
      name: this._name.value,
      status: this._status.value,
      species: this._species.value,
      gender: this._gender.value,
      type: this._type.value,
      location: [],
      origin: []
    }
  }

  public clearFilters(): void {
    this._name.next([]);
    this._status.next([]);
    this._species.next([]);
    this._gender.next([]);
    this._type.next([]);
  }

  //  ==========  getters  ==========  //
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

  get info$(): Observable<Info> {
    return this._info.asObservable();
  }

  get results$(): Observable<Result[]> {
    return this._results.asObservable();
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
}
