import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class ManagerService {
  constructor(private http:HttpClient, private cookies: CookieService) { }
  getAbsences(): Observable<any>{
    if (this.cookies.get('role') === 'manager') {
      return this.http.get(baseURL + '/api/absences/');
    } else {
      alert('You are not authorized to view this page.');
      return this.http.get(baseURL);
    }
  }
  getUser(userId: string): Observable<any> {
    return this.http.get(baseURL + '/api/users/' + userId);
  }
  acceptAbsence(absence: any): Observable<any> {
    const body = {status: 'accepted'};
    const url = baseURL + '/api/absences/' + absence.id;
    return this.http.put(url, body);
  }
  declineAbsence(absence: any): Observable<any> {
    const body = {status: 'denied'};
    const url = baseURL + '/api/absences/' + absence.id;
    return this.http.put(url, body);
  }
  getEmployees(): Observable<any> {
    return this.http.post(baseURL + '/api/users/find', {role: 'employee'});
  }
}
