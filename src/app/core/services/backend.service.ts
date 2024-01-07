import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { CaractersAPIResponse } from '../models/caracters.interfaces';
import { newFilter } from '../../shared/filter.factory';
import { Character } from '../models/character.model';

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

    return this.http.get<CaractersAPIResponse>(this.URL, { params: params })
      .pipe(
        catchError(this.handleError),
      );
      //   map(this.jsonDataToCharacters)
  }

  private jsonDataToCharacters(jsonData: any[]): Character[] {
    const characters: Character[] = [];

    jsonData.forEach(data => {
      const character = Object.assign(new Character(), data)
      characters.push(character);
    });

    return characters;
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

    return this.http.get<CaractersAPIResponse>(nextUrl, { params: params })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    }
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
