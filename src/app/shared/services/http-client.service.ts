import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

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

  // getAllResources(options?: IOptions): Observable<TResource[]> {
  //   let params = convertParamsToHttpParams(options?.params);

  //   return this.http.get<TResource[]>(this.apiPath, { params }).pipe(
  //     map(this.jsonDataToResources.bind(this)),
  //     catchError(this.handleError)
  //   );
  // }

  protected jsonDataToResources(jsonData: any[]): TResource[] {
    const resources: TResource[] = [];

    jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));

    return resources;
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
