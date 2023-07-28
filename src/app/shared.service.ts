import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { initialsignup } from './models/initialsignup.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

    baseAPIUrl = "http://localhost:5184/";

    constructor(private http: HttpClient) { }

    addInitialSignup(initialSignupRequest : initialsignup): Observable<initialsignup> {    
     return this.http.post<initialsignup>(this.baseAPIUrl + 'Auth/Register', initialSignupRequest);

    } 
    /**getStudentList(): Observable < any[] > {
        return this.http.get < any > (this.APIUrl + '/Student');
    }
    updateStudent(val: any) {
        return this.http.put(this.APIUrl + '/Student', val);
    }
    deleteStudent(id: any) {
        return this.http.delete(this.APIUrl + '/Student/' + id);
    }
    getDepartmentList(): Observable < any[] > {
        return this.http.get < any > (this.APIUrl + '/Department');
    }
    addDepartment(val: any) {
        return this.http.post(this.APIUrl + '/Department', val);
    }
    updateDepartment(val: any) {
        return this.http.put(this.APIUrl + '/Department', val);
    }
    deleteDepartment(id: any) {
        return this.http.delete(this.APIUrl + '/Department/' + id);
    }*/
}