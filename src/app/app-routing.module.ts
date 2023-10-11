import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ClaimsagentsignupComponent } from './claimsagentsignup/claimsagentsignup.component';
import { InitialsignupComponent } from './initialsignup/initialsignup.component';
import { LoginComponent } from './login/login.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { OptComponent } from './opt/opt.component';
import { ViewAuctionsComponent } from './admin/view-auctions/view-auctions.component';

import { ClaimsAgentDashboardComponent } from './claims-agent/claims-agent-dashboard/claims-agent-dashboard.component';
import { CaSidebarComponent } from './claims-agent/ca-sidebar/ca-sidebar.component';
import { CaNavbarComponent } from './claims-agent/ca-navbar/ca-navbar.component';
import { AuctionComponent } from './claims-agent/auction/auction.component';
import { CaProfileComponent } from './claims-agent/ca-profile/ca-profile.component';
import { UploadClaimComponent } from './claims-agent/upload-claim/upload-claim.component';
import { ManageauctionComponent } from './claims-agent/manageauction/manageauction.component';
import { ManageclaimsComponent } from './claims-agent/manageclaims/manageclaims.component';
import { SpActivityComponent } from './serviceprovider/serviceproviderprofile/sp-activity/sp-activity.component';
import { ServiceproviderprofileComponent } from './serviceprovider/serviceproviderprofile/serviceproviderprofile/serviceproviderprofile.component';
import { AuctionDashboardComponent } from './serviceprovider/serviceproviderprofile/auction-dashboard/auction-dashboard.component';
import { BidFormComponent } from './serviceprovider/serviceproviderprofile/bid-form/bid-form.component';
import { EmailVeriComponent } from './email-veri/email-veri.component';
// Admin 
import { AdminNavBarComponent } from './admin/admin-nav-bar/admin-nav-bar/admin-nav-bar.component';
import { AdminSideBarComponent } from './admin/admin-side-bar/admin-side-bar/admin-side-bar.component';
import { AdminmanageauctionComponent } from './admin/manageauction/adminmanageauction/adminmanageauction.component';
import { ManagebidComponent } from './admin/managebid/managebid/managebid.component';
import { ManagecaComponent } from './admin/manageca/manageca/manageca.component';
import { ManagespComponent } from './admin/managesp/managesp/managesp.component';
//forgot password
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { SpReportDashComponent } from './reporting/sp-report-dash/sp-report-dash.component';
import { CaReportDashComponent } from './reporting/ca-report-dash/ca-report-dash.component';
import { ResetPassword } from './models/resetPassword.model';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { updateClaim } from './models/claimagent/updateClaim';
import { UpdateclaimComponent } from './claims-agent/updateclaim/updateclaim/updateclaim.component';
import { UpdateauctionComponent } from './claims-agent/updateauction/updateauction/updateauction.component';
import { MaterialListComponent } from './serviceprovider/serviceproviderprofile/material-list/material-list/material-list.component';
import { AdminReportComponent } from './reporting/admin-report/admin-report.component';
import { AwardauctionComponent } from './awardauction/awardauction.component';
import { FavouriteAuctionComponent } from './serviceprovider/serviceproviderprofile/favourite-auction/favourite-auction.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'casignup', component: ClaimsagentsignupComponent},
  { path: 'initialsignup', component: InitialsignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'adminprofile', component: AdminprofileComponent},
  { path: 'opt', component: OptComponent},
  { path: 'caprofile', component: CaProfileComponent},
  { path: 'claims-agent-dashboard', component: ClaimsAgentDashboardComponent},
  { path: 'ca-sidebar', component: CaSidebarComponent},
  { path: 'ca-navbar', component: CaNavbarComponent},
  { path: 'addauction', component: AuctionComponent},
  { path: 'uploadclaim', component: UploadClaimComponent},
  { path: 'manageclaims', component: ManageclaimsComponent},
  { path: 'manageauctions', component: ManageauctionComponent},
  { path: 'sp-activity', component: SpActivityComponent},
  { path: 'serviceproviderprofile', component: ServiceproviderprofileComponent},
  { path: 'auction-dashboard', component: AuctionDashboardComponent},
  { path: 'reset', component: ResetPasswordComponent},
  { path: 'updateclaim', component: UpdateclaimComponent},
  { path: 'updateauction', component: UpdateclaimComponent},
  { path: 'material-list/:bidId', component: MaterialListComponent},
  { path: 'emailVeri', component: EmailVeriComponent},
  {path: 'favourite-auction', component: FavouriteAuctionComponent},

  //admin 
  { path: 'admin-nav-bar', component: AdminNavBarComponent},
  { path: 'admin-side-bar', component: AdminSideBarComponent},
  { path: 'adminmanageauction', component: AdminmanageauctionComponent},
  { path: 'managebids', component: ManagebidComponent},
  { path: 'manageca', component: ManagecaComponent},
  { path: 'managesp', component: ManagespComponent},
  { path: 'bid-form', component: BidFormComponent},
  { path: 'forgotpassword', component: ForgotpasswordComponent},
  { path: 'changepassword', component: ChangepasswordComponent},
  { path: 'sp-report-dash', component: SpReportDashComponent},
  { path: 'ca-report-dash',component: CaReportDashComponent},
  { path: 'admin-report', component: AdminReportComponent},
  { path: 'awardauction', component: AwardauctionComponent},
  {path: 'view-auctions', component: ViewAuctionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
