import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filter } from '../interfaces/filters.interface';
import { CaractersAPIResponse } from '../interfaces/caracters.interfaces';
import { newFilter } from '../shared/filter.factory';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private readonly URL = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) { }

  public getCharacters(filter = newFilter()): Observable<CaractersAPIResponse> {
    let params = new HttpParams();

    if (filter.name && filter.name.length > 0) {
      params = params.set('name', filter.name.join(','));
    }
    if (filter.status && filter.status.length > 0) {
      params = params.set('status', filter.status.join(','));
    }
    if (filter.species && filter.species.length > 0) {
      params = params.set('species', filter.species.join(','));
    }
    if (filter.type && filter.type.length > 0) {
      params = params.set('type', filter.type.join(','));
    }
    if (filter.gender && filter.gender.length > 0) {
      params = params.set('gender', filter.gender.join(','));
    }

    return this.http.get<CaractersAPIResponse>(this.URL, { params: params });
  }

  public getNextPageOfCharacteres(nextUrl: string | null, filter = newFilter()): Observable<CaractersAPIResponse> {
    let params = new HttpParams();

    if (filter.name && filter.name.length > 0) {
      params = params.set('name', filter.name.join(','));
    }
    if (filter.status && filter.status.length > 0) {
      params = params.set('status', filter.status.join(','));
    }
    if (filter.species && filter.species.length > 0) {
      params = params.set('species', filter.species.join(','));
    }
    if (filter.type && filter.type.length > 0) {
      params = params.set('type', filter.type.join(','));
    }
    if (filter.gender && filter.gender.length > 0) {
      params = params.set('gender', filter.gender.join(','));
    }

    if(!nextUrl) return this.http.get<CaractersAPIResponse>(this.URL, { params: params });

    return this.http.get<CaractersAPIResponse>(nextUrl, { params: params });
  }
}
