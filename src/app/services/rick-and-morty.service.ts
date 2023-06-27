import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CaractersAPIResponse } from '../interfaces/caracters.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  private readonly URL = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) { }

  public getCharacters(names?: string[], statuses?: string[], species?: string[], types?: string[], genders?: string[]): Observable<CaractersAPIResponse> {
    let params = new HttpParams();

    if (names && names.length > 0) {
      params = params.set('name', names.join(','));
    }
    if (statuses && statuses.length > 0) {
      params = params.set('status', statuses.join(','));
    }
    if (species && species.length > 0) {
      params = params.set('species', species.join(','));
    }
    if (types && types.length > 0) {
      params = params.set('type', types.join(','));
    }
    if (genders && genders.length > 0) {
      params = params.set('gender', genders.join(','));
    }

    return this.http.get<CaractersAPIResponse>(this.URL, { params: params });
  }
}
