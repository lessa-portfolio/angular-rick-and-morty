import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CaractersAPIResponse } from '../interfaces/caracters.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  private readonly URL = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) { }

  public getCharacters(): Observable<CaractersAPIResponse> {
    return this.http.get<CaractersAPIResponse>(this.URL);
  }
}
