import { BehaviorSubject, Observable, tap, scan } from 'rxjs';
import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';
import { Info, Result } from '../interfaces/caracters.interfaces';
import { newFilter, newInfo } from '../shared/filter.factory';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  private _name = new BehaviorSubject<string[]>([]);
  private _status = new BehaviorSubject<string[]>([]);
  private _species = new BehaviorSubject<string[]>([]);
  private _gender = new BehaviorSubject<string[]>([]);
  private _type  = new BehaviorSubject<string[]>([]);

  private _info = new BehaviorSubject<Info>(newInfo());
  private _results = new BehaviorSubject<Result[]>([]);

  constructor(private backendService: BackendService) {
    this.getInitialsData();
  }

  //  ==========  methods  ==========  //
  public getInitialsData() {
    this.backendService.getCharacters(newFilter()).subscribe(response => {
      this._info.next(response.info)
      this._results.next(response.results)
    });
  }

  public loadMoreCharacteres() {
    this.backendService.getNextPageOfCharacteres(this._info.value.next).subscribe(response => {
      const currentResults = this._results.getValue();
      const newResults = currentResults.concat(response.results);

      this._results.next(newResults);
      this._info.next(response.info);
    });
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
