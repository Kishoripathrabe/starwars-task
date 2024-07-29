import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://swapi.dev/api/';
  private apiCacheName = 'api-cache';

  constructor(private http: HttpClient) { }

  private async getFromCacheStorage(key: string): Promise<any> {
    const cache = await caches.open(this.apiCacheName);
    const response = await cache.match(key);
    if (response) {
      return response.json();
    }
    return null;
  }

  private async setToCacheStorage(key: string, data: any): Promise<void> {
    const cache = await caches.open(this.apiCacheName);
    const response = new Response(JSON.stringify(data));
    await cache.put(key, response);
  }

  async getFromCache(): Promise<any> {
    return this.getFromCacheStorage('apiEndpoints');
  }

  setOnCache(data: any) {
    this.setToCacheStorage('apiEndpoints', data);
  }

  setSinglePersonDetailsOnCache(id: any, data: any) {
    this.getFromCacheStorage('singlePersonDetails').then((singlePersonDetailObj) => {
      let personsDetailMap = singlePersonDetailObj || {};
      personsDetailMap[id] = data;
      this.setToCacheStorage('singlePersonDetails', personsDetailMap);
    });
  }

  async getSinglePersonDetailsOnCache(id: any): Promise<any> {
    const singlePersonDetailObj = await this.getFromCacheStorage('singlePersonDetails');
    return singlePersonDetailObj ? singlePersonDetailObj[id] : null;
  }

  singlePersonReq(id: any): Observable<any> {
    return new Observable((observer) => {
      this.getSinglePersonDetailsOnCache(id).then((person) => {
        if (person) {
          observer.next(person);
          observer.complete();
        } else {
          this.getFromCache().then((endpoints) => {
            this.http.get(`${endpoints['people']}${id}`).subscribe((res) => {
              this.setSinglePersonDetailsOnCache(id, res);
              observer.next(res);
              observer.complete();
            });
          });
        }
      });
    });
  }

  async toggleFavorite(pid: any) {
    let favorite = await this.getFromCacheStorage('favorite');
    let favoriteArr = favorite || [];
    let flag;
      if(favoriteArr.indexOf(pid) !== -1) {
        favoriteArr.splice(favoriteArr.indexOf(pid), 1);
        flag = false;
      }else{
        favoriteArr.push(pid);
        flag =true;
      }
      this.setToCacheStorage('favorite', favoriteArr);
      return flag;
  }
  
async getFavorite(pid: any): Promise<boolean> {
  const favorite = await this.getFromCacheStorage('favorite');
  const favoriteArr = favorite || [];
  return favoriteArr.includes(pid);
}


  initializeEndpoints(): Observable<any> {
    return new Observable((observer) => {
      this.getFromCache().then((storedEndpoints) => {
        if (storedEndpoints) {
          observer.next(storedEndpoints);
          observer.complete();
        } else {
          this.http.get(this.baseUrl).subscribe((data: any) => {
            this.setOnCache(data);
            observer.next(data);
            observer.complete();
          });
        }
      });
    });
  }

  setPageDataOnCache(psQuery: any, data: any) {
    this.getFromCacheStorage('pageData').then((pageDataObj) => {
      let pageDataMap = pageDataObj || {};
      pageDataMap[psQuery] = data;
      this.setToCacheStorage('pageData', pageDataMap);
    });
  }

  async getPageDataOnCache(psQuery: any): Promise<any> {
    const pageDataObj = await this.getFromCacheStorage('pageData');
    return pageDataObj ? pageDataObj[psQuery] : null;
  }

  fetchFromEndpoint(key: string, psQuery: any): Observable<any> {
    return new Observable((observer) => {
      this.getFromCache().then((endpoints) => {
        const url = endpoints[key];
        this.getPageDataOnCache(psQuery).then((cachedData) => {
          if (cachedData) {
            observer.next(cachedData);
            observer.complete();
          } else {
            this.http.get(`${url}?${psQuery}`).subscribe((res) => {
              this.setPageDataOnCache(psQuery, res);
              observer.next(res);
              observer.complete();
            });
          }
        });
      });
    });
  }

  getData(urlKey: any, psQuery = ''): Observable<any> {
    return this.initializeEndpoints().pipe(
      switchMap(() => this.fetchFromEndpoint(urlKey, psQuery))
    );
  }
}
