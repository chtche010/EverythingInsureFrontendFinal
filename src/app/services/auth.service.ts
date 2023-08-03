import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { initialsignup } from '../models/initialsignup.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl: string = "http://localhost:5184/";

  constructor(private http: HttpClient) { }

  public register(InitialSignUp: initialsignup): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Auth/Register', InitialSignUp);
  }

  public login(InitialSignUp: initialsignup): Observable<string> {
    return this.http.post(this.baseUrl + 'Auth/Login', InitialSignUp, {
      responseType: 'text',
    })
  }

  public getcaprofile(): Observable<string> {
    return this.http.get<string>(this.baseUrl + 'api/ClaimsAgent/Get-Profile');
  }

}
