import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http:HttpClient, private cookies: CookieService) { }
  getAbsences(): Observable<any>{
    return this.http.post(baseURL + '/api/absences/find', {userId: this.cookies.get('userId')});
  }
  editAbsence(absence: any): Observable<any> {
    return this.http.put(baseURL + '/api/absences/' + absence.id, absence);
  }
  createAbsence(absence: any): Observable<any> {
    return this.http.post(baseURL + '/api/absences/create', absence);
  }
  getUser(): Observable<any> {
    return this.http.get(baseURL + '/api/users/' + this.cookies.get('id'));
  }
  updateRemainingDays(user: any, absence: any): Observable<any> {
    const body = {remainingDays: user.remainingDays - absence.workingDays};
    const url = baseURL + '/api/users/' + user.id;
    return this.http.put(url, body);
  }
 }
