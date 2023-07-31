import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { initialsignup } from './models/initialsignup.model';
import { addclaimsagent } from './models/addclaimsagent';
import { addserviceprovider } from './models/addserviceprovider';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

    baseAPIUrl = "http://localhost:5184/";

    constructor(
        private http: HttpClient,
        private router: Router) { }

    addInitialSignup(initialSignupRequest : initialsignup): Observable<initialsignup> {    
     return this.http.post<initialsignup>(this.baseAPIUrl + 'Auth/Register', initialSignupRequest);
    } 

    addClaimsAgent(addClaimsAgentRequest : addclaimsagent): Observable<addclaimsagent> {    
        return this.http.post<addclaimsagent>(this.baseAPIUrl + 'api/ClaimsAgent/Create Claims Agent Profile', addClaimsAgentRequest);
    }

    addServiceProvider(addServiceProviderRequest : addserviceprovider): Observable<addserviceprovider> {    
        return this.http.post<addserviceprovider>(this.baseAPIUrl + 'api/ServiceProvider/ Create ServiceProvider Profile', addServiceProviderRequest);
    }

    login(loginObj: any) {
        return this.http.post<any>(this.baseAPIUrl + 'Auth/Login', loginObj)
    }

    signOut(){
        localStorage.clear();
        this.router.navigate(['login'])
    }

    storeToken(tokenValue: string){
        localStorage.setItem('token', tokenValue)
    }

    getToken() {
        return localStorage.getItem('token')
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token')
    }

    // updateStudent(val: any) {
    //     return this.http.put(this.APIUrl + '/Student', val);
    // }
    // deleteStudent(id: any) {
    //     return this.http.delete(this.APIUrl + '/Student/' + id);
    // }
    // getDepartmentList(): Observable < any[] > {
    //     return this.http.get < any > (this.APIUrl + '/Department');
    // }
    // addDepartment(val: any) {
    //     return this.http.post(this.APIUrl + '/Department', val);
    // }
    // updateDepartment(val: any) {
    //     return this.http.put(this.APIUrl + '/Department', val);
    // }
    // deleteDepartment(id: any) {
    //     return this.http.delete(this.APIUrl + '/Department/' + id);
    // }
}