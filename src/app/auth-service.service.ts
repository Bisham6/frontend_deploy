import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor() { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  //store the token in local storage
  setToken(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  //get token
  getToken() {
    return localStorage.getItem('token');
  }

  //check if user is logged in  
  isLoggedIn() {
    return this.loggedIn.value;
  }

  //Logout user
  logout() {
    localStorage.removeItem('token');
  }
}
