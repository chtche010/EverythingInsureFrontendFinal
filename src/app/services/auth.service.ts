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


  // all users 

  public register(InitialSignUp: initialsignup): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Auth/Register', InitialSignUp);
  }

  public login(InitialSignUp: initialsignup): Observable<string> {
    return this.http.post(this.baseUrl + 'Auth/Login', InitialSignUp, {
      responseType: 'text',
    })
  }

  // claims agents 

  public getcaprofile(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/ClaimsAgent/Get-Profile');
  }

  // service providers 
  public getspdetails(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}api/ServiceProvider/Get-Profile`);
  }

  public updatespdetails(profileData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}api/ServiceProvider/Update-Profile`, profileData);
  }
}
