import { HttpParams } from '@angular/common/http';
import { IParams } from '../models/http-client.model';

export function convertParamsToHttpParams(
  params: HttpParams | IParams | undefined
): HttpParams {
  let queryParams = new HttpParams();

  if (params) {
    if (typeof params === 'object' && !Array.isArray(params)) {
      for (const key in params) {
        // if (params.hasOwnProperty(key)) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          queryParams = queryParams.append(
            key,
            String((params as IParams)[key])
          );
        }
      }
    } else if (params instanceof HttpParams) {
      queryParams = combineHttpParams(queryParams, params);
    }
  } else {
    console.warn('Formato inválido. Expectativa de um Objeto ou HttpParams');
  }
  return queryParams;
}

function combineHttpParams(
  params1: HttpParams,
  params2: HttpParams
): HttpParams {
  const combinedParams = new HttpParams({
    fromObject: { ...params1, ...params2 },
  });
  return combinedParams;
}
