import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ClaimsagentsignupComponent } from './claimsagentsignup/claimsagentsignup.component';
import { ServiceproviderprofileComponent } from './serviceproviderprofile/serviceproviderprofile.component';
import { InitialsignupComponent } from './initialsignup/initialsignup.component';
import { LoginComponent } from './login/login.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
//Bens added
import { ClaimsAgentDashboardComponent } from './claims-agent/claims-agent-dashboard/claims-agent-dashboard.component';
import { CaSidebarComponent } from './claims-agent/ca-sidebar/ca-sidebar.component';
import { CaNavbarComponent } from './claims-agent/ca-navbar/ca-navbar.component';
import { AuctionComponent } from './claims-agent/auction/auction.component';
import { CaProfileComponent } from './claims-agent/ca-profile/ca-profile.component';
import { UploadClaimComponent } from './claims-agent/upload-claim/upload-claim.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard]},
  { path: 'casignup', component: ClaimsagentsignupComponent, canActivate: [AuthGuard]},
  { path: 'serviceproviderprofile', component: ServiceproviderprofileComponent, canActivate: [AuthGuard]},
  { path: 'initialsignup', component: InitialsignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'adminprofile', component: AdminprofileComponent},
  { path: 'caprofile', component: CaProfileComponent},
  { path: 'claims-agent-dashboard', component: ClaimsAgentDashboardComponent},
  { path: 'ca-sidebar', component: CaSidebarComponent},
  { path: 'ca-navbar', component: CaNavbarComponent},
  { path: 'auction', component: AuctionComponent},
  { path: 'upload-claim', component: UploadClaimComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
