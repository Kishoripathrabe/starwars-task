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

  toggleFavorite(pid: any) {
    let favoriteArr:any = JSON.parse(localStorage.getItem('favArr')||'[]');
    let flag;
      if(favoriteArr.indexOf(pid) !== -1) {
        favoriteArr.splice(favoriteArr.indexOf(pid), 1);
        flag = false;
      }else{
        favoriteArr.push(pid);
        flag = true;
      }
      localStorage.setItem('favArr', JSON.stringify(favoriteArr));
      return flag;
  }
  
 getFavorite(pid: any) {
  let favoriteArr = JSON.parse(localStorage.getItem('favArr') || '[]');
  return favoriteArr.includes(pid);
}


  initializeEndpoints(): Observable<any> {
    return this.http.get(this.baseUrl)    
  }


  fetchFromEndpoint(data: any, key: string, psQuery: any): Observable<any> {
    const url = data[key];
    return this.http.get(`${url}?${psQuery}`)
  }

  getData(urlKey: any, psQuery = ''): Observable<any> {
    return this.initializeEndpoints().pipe(
      switchMap((data) => this.fetchFromEndpoint(data, urlKey, psQuery))
    );
  }
}
