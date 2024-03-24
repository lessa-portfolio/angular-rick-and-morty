import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, tap } from 'rxjs';
import { IFilter } from '../models/filter.interface';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _filterSubject = new BehaviorSubject<IFilter>({
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    page: 0,
  });

  private _name = new BehaviorSubject<string>('');
  private _status = new BehaviorSubject<string>('');
  private _species = new BehaviorSubject<string>('');
  private _gender = new BehaviorSubject<string>('');
  private _type = new BehaviorSubject<string>('');
  private _page = new BehaviorSubject<number>(0);

  constructor() {
    combineLatest([
      this._name,
      this._status,
      this._species,
      this._gender,
      this._type,
      this._page,
    ])
      .pipe(
        tap(([name, status, species, gender, type, page]) => {
          const filter = { name, status, species, gender, type, page };
          this._filterSubject.next(filter);
          console.log('filters', filter);
        })
      )
      .subscribe();
  }

  public clearFilters(): void {
    this._name.next('');
    this._status.next('');
    this._species.next('');
    this._gender.next('');
    this._type.next('');
    this._page.next(0);
  }

  public getFilterSetted(): IFilter {
    return this._filterSubject.value;
  }

  get filter$(): Observable<IFilter> {
    return this._filterSubject.asObservable();
  }

  get name$(): Observable<string> {
    return this._name.asObservable();
  }

  get status$(): Observable<string> {
    return this._status.asObservable();
  }

  get species$(): Observable<string> {
    return this._species.asObservable();
  }

  get gender$(): Observable<string> {
    return this._gender.asObservable();
  }

  get type$(): Observable<string> {
    return this._type.asObservable();
  }

  //  ==========  setters  ==========  //
  public setName(value: string): void {
    this._name.next(value);
  }

  public setStatus(value: string): void {
    this._status.next(value);
  }

  public setSpecies(value: string): void {
    this._species.next(value);
  }

  public seGender(value: string): void {
    this._gender.next(value);
  }

  public setType(value: string): void {
    this._type.next(value);
  }

  public setFilter(filter: IFilter): void {
    this._filterSubject.next(filter);
  }

  public nextPage(): void {
    this._page.next(this._page.getValue() + 1);
  }
}
