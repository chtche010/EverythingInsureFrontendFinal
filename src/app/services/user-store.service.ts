import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private email$ = new BehaviorSubject<string>("");
  private username$ = new BehaviorSubject<string>("");
  private accountType$ = new BehaviorSubject<string>("");

  constructor() { }

  public getaccountTypeFromStore(){
    return this.accountType$.asObservable();
  }

  public setaccountTypeForStore(accountType:string){
    this.accountType$.next(accountType);
  }

  public getusernameFromStore(){
    this.username$.asObservable();
  }

  public setusernameForStore(username:string) {
    this.username$.next(username);
  }

  public getemailFromStore(){
    this.email$.asObservable();
  }

  public setemailForStore(email:string) {
    this.email$.next(email);
  }
}
