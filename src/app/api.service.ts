import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment/environment'; 

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  userPost(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register`, data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, data);
  }

  getAllUsers():Observable<any>{
    return this.http.get(`${this.apiUrl}users`)
  }
}
