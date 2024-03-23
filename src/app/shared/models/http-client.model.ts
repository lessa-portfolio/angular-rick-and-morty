import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface IOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body' | 'events' | 'response';
  context?: HttpContext;
  params?: HttpParams | IParams;
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
}

export interface IParams {
  [param: string]:
    | string
    | number
    | boolean
    | readonly (string | number | boolean)[];
}
