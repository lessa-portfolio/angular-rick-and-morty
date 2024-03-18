import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
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

  protected getResource(options?: any): Observable<TResource> {
    const headers = new HttpHeaders();
    // let params = convertParamsToHttpParams(options?.params);

    return this.http.get<TResource[]>(this.apiPath).pipe(
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
      console.error(`Um erro ocorreu: ${ error.error}`);
    }
    console.error(`Backend error com status ${ error.status }: ${ error.error }`);
    return throwError(() => new Error(`Por favor, tente novamente mais tarde.`));
  }
}
