import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IParams } from '../models/http-client.model';
import { convertParamsToHttpParams } from '../utils/convertParamsToHttpParams';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpClientService<TResource> {
  protected http: HttpClient;

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => TResource
  ) {
    this.http = injector.get(HttpClient);
  }

  protected getResource(params?: IParams): Observable<TResource> {
    return this.http
      .get<TResource[]>(this.apiPath, {
        params: convertParamsToHttpParams(params),
      })
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      );
  }

  protected jsonDataToResources(jsonData: any[]): TResource[] {
    return jsonData.map(this.jsonDataToResourceFn);
  }

  protected jsonDataToResource(jsonData: any): TResource {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);

    if (error.status === 0) {
      console.error(`Um erro ocorreu: ${error.error}`);
    }
    console.error(`Backend error com status ${error.status}: ${error.error}`);
    return throwError(
      () => new Error(`Por favor, tente novamente mais tarde.`)
    );
  }
}
