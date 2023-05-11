import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
const baseURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient, private cookies: CookieService) { }
  login(data: any): Observable<any>{
    return this.http.post(baseURL + '/api/users/login', data);
  }
  register(data: any): Observable<any>{
    return this.http.post(baseURL + '/api/users/create', data);
  }
}
