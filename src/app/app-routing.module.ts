import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ClaimsagentsignupComponent } from './claimsagentsignup/claimsagentsignup.component';
import { ServiceproviderprofileComponent } from './serviceproviderprofile/serviceproviderprofile.component';
import { InitialsignupComponent } from './initialsignup/initialsignup.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'casignup', component: ClaimsagentsignupComponent},
  { path: 'serviceproviderprofile', component: ServiceproviderprofileComponent},
  { path: 'initialsignup', component: InitialsignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
