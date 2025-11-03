import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { GlobalCacheConfig } from 'ts-cacheable';

import { JwtService } from '~/services/jwt.service';
import { JwtNotFoundException } from '~/exceptions/jwt-not-found.exception';

const cacheStorageStrategy = new GlobalCacheConfig.storageStrategy();
const authCacheStorageStrategy = new GlobalCacheConfig.storageStrategy();

@Injectable({
  providedIn: 'root',
})
export class ApiPlatform
{
  static API_URL = 'https://localhost:8000';
  static CONTENT_TYPE_JSON = { 'Content-Type': 'application/json' };

  /**
   * Besoin pour faire fonctionner ApiPlatform
   */
  static CONTENT_TYPE_LINKED_JSON = { 'Content-Type': 'application/ld+json' };
  /**
   * Besoin pour faire fonctionner ApiPlatform avec la méthode PATCH
   */
  static CONTENT_TYPE_MERGE_PATCH = { 'Content-Type': 'application/merge-patch+json' };

  constructor(private http: HttpClient, private apiAuth: ApiPlatformAuthorizationBearer)
  {
  }

  /**
   * Requête authentifiée.
   */
  auth(): ApiPlatformAuthorizationBearer
  {
    return this.apiAuth;
  }

  /**
   * Requête vers l'API en GET.
   */

  get<R>(apiPath: `/api/${string}`): Observable<R>
  {
    const cache = this.#getCacheRequest<R>(apiPath);

    if (cache) return cache;

    return this.#setCacheRequest(
      this.http.get<R>(`${ApiPlatform.API_URL}${apiPath}`, { headers: ApiPlatform.CONTENT_TYPE_LINKED_JSON }),
      apiPath,
    );
  }

  /**
   * Requête vers l'API en POST.
   */
  post<R, D extends object = object>(apiPath: `/api/${string}`, data: D): Observable<R>
  {
    return this.#unsetCacheRequest(
      this.http.post<R>(`${ApiPlatform.API_URL}${apiPath}`, data, { headers: ApiPlatform.CONTENT_TYPE_LINKED_JSON }),
      apiPath,
    );
  }

  /**
   * Requête vers le backend en POST.
   */
  postFormData<R>(apiPath: `/api/${string}`, data: FormData): Observable<R>
  {
    return this.#unsetCacheRequest(
      this.http.post<R>(`${ApiPlatform.API_URL}${apiPath}`, data),
      apiPath,
    );
  }

  #getCacheRequest<R>(cacheKey: string): false | Observable<R>
  {
    const caches = cacheStorageStrategy.getAll('GET');

    if ('length' in caches && caches.length > 0) {
      const find = caches.find((r) => r.parameters === cacheKey);
      if (find) return of(find?.response as R);
    }

    return false;
  }

  #setCacheRequest<R>(obsReq: Observable<R>, cacheKey: string): Observable<R>
  {
    return obsReq.pipe(tap((res: R) => {
      cacheStorageStrategy.add({
        parameters: cacheKey,
        response: res,
        created: new Date,
      }, 'GET');
    }))
  }

  #unsetCacheRequest<R>(obsReq: Observable<R>, cacheKey: string): Observable<R>
  {
    return obsReq.pipe(
      tap(() => {
        cacheStorageStrategy.removeAll('GET');
        authCacheStorageStrategy.removeAll('GET_AUTH');
      }),
    );
  }
}

@Injectable({
  providedIn: 'root',
})
class ApiPlatformAuthorizationBearer
{
  constructor(private http: HttpClient, private jwtService: JwtService)
  {
  }

  authorizationBearer()
  {
    if (!this.jwtService.hasToken()) {
      throw new JwtNotFoundException();
    }

    return {
      'Authorization': `Bearer ${this.jwtService.getToken()}`,
    };
  }

  /**
   * Requête vers l'API en GET.
   */
  get<R>(apiPath: `/api/${string}`): Observable<R>
  {
    const cache = this.#getCacheRequest<R>(apiPath);
    if (cache) return cache;

    const headers = {
      ...ApiPlatform.CONTENT_TYPE_LINKED_JSON,
      ...this.authorizationBearer(),
    };

    return this.#setCacheRequest(
      this.http.get<R>(`${ApiPlatform.API_URL}${apiPath}`, { headers }),
      apiPath,
    );
  }

  /**
   * Requête vers l'API en POST.
   */
  post<R, D extends object = object>(apiPath: `/api/${string}`, data: D): Observable<R>
  {
    const headers = {
      ...ApiPlatform.CONTENT_TYPE_LINKED_JSON,
      ...this.authorizationBearer(),
    };

    return this.#unsetCacheRequest(
      this.http.post<R>(`${ApiPlatform.API_URL}${apiPath}`, data, { headers }),
      apiPath,
    );
  }

  /**
   * Requête vers le backend en POST.
   */
  postFormData<R>(apiPath: `/api/${string}`, data: FormData): Observable<R>
  {
    const headers = {
      ...this.authorizationBearer(),
    };

    return this.#unsetCacheRequest(
      this.http.post<R>(`${ApiPlatform.API_URL}${apiPath}`, data, { headers }),
      apiPath,
    );
  }

  /**
   * Requête vers l'API en PATCH.
   */
  patch<R, D extends object = object>(
    apiPath: `/api/${string}/${number}`,
    data: Partial<D>,
  ): Observable<R>
  {
    const headers = {
      ...ApiPlatform.CONTENT_TYPE_MERGE_PATCH,
      ...this.authorizationBearer(),
    };
    return this.#unsetCacheRequest(
      this.http.patch<R>(`${ApiPlatform.API_URL}${apiPath}`, data, { headers }),
      apiPath,
    );
  }

  /**
   * Requête vers l'API en DELETE.
   */
  delete<R>(
    apiPath:
      | `/api/${string}/${number}`
      | `/api/${string}/${number}/${string}`,
  ): Observable<R>
  {
    const headers = {
      ...ApiPlatform.CONTENT_TYPE_LINKED_JSON,
      ...this.authorizationBearer(),
    };

    return this.#unsetCacheRequest(
      this.http.delete<R>(`${ApiPlatform.API_URL}${apiPath}`, { headers }),
      apiPath,
    );
  }

  #getCacheRequest<R>(cacheKey: string): false | Observable<R>
  {
    const caches = authCacheStorageStrategy.getAll('GET_AUTH');

    if ('length' in caches && caches.length > 0) {
      const find = caches.find((r) => r.parameters === cacheKey);
      if (find) return of(find?.response as R);
    }

    return false;
  }

  #setCacheRequest<R>(obsReq: Observable<R>, cacheKey: string): Observable<R>
  {
    return obsReq.pipe(tap((res: R) => {
      authCacheStorageStrategy.add({
        parameters: cacheKey,
        response: res,
        created: new Date,
      }, 'GET_AUTH');
    }))
  }

  #unsetCacheRequest<R>(obsReq: Observable<R>, cacheKey: string): Observable<R>
  {
    return obsReq.pipe(
      tap(() => {
        cacheStorageStrategy.removeAll('GET');
        authCacheStorageStrategy.removeAll('GET_AUTH');
      }),
    );
  }
}
