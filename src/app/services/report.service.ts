import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl: string = 'http://localhost:5184/ClaimsAgentReport';

  constructor(private http: HttpClient) { }

  public getCountClaims(): Observable<number> {
    const url = `${this.baseUrl}/CountClaims`;
    return this.http.get<number>(url);
  }

}