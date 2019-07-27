import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MultiSelectModule} from 'primeng/multiselect';
import {NgIdleModule} from '@ng-idle/core';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import { GrowlModule } from 'primeng/primeng';
import { MatDialogModule,MatDialogConfig } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalpopupComponent } from './modalpopup/modalpopup.component';
import { LogoutComponent } from './logout/logout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuardService } from './auth-guard.service';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';
import { BooklistComponent } from './booklist/booklist.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { NumberonlyDirective } from './numberonly.directive';
import { AlphabetonlyDirective } from './alphabetonly.directive';


const appRoutes : Routes = [ 
      {path:'login', component: AppComponent},
      {
        path:'app',
        component:NavbarComponent,
        canActivateChild:[AuthGuardService],
        children:
        [
           {
             path:'userprofile', component:UserprofileComponent
           },
           {
             path:'booklist', component:BooklistComponent
           },
           {
             path:'Cart',component:CartItemComponent
           },
           {
             path:'payment', component:PaymentComponent
           },
           {
            path:'paymentStatus/:PayuMoneyId', component:PaymentStatusComponent     
           }
        ]
       },
      {path:'logout', component:LogoutComponent},
      {path:'', redirectTo:'/login',pathMatch:'full'},
      {path:'**', component:PageNotFoundComponent}
];

@NgModule({
    declarations: [
    AppComponent,
    UserprofileComponent,
    HomeComponent,
    PageNotFoundComponent,
    ModalpopupComponent,
    LogoutComponent,
    NavbarComponent,
    ConfirmdialogComponent,
    BooklistComponent,
    CartItemComponent,
    PaymentComponent,
    PaymentStatusComponent,
    jqxGridComponent,
    NumberonlyDirective,
    AlphabetonlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GrowlModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    NgIdleModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    NgbModule.forRoot(),
    MatDialogModule,
    MatButtonModule
  ],
  providers: [MatDialogConfig],
  entryComponents : [ModalpopupComponent,ConfirmdialogComponent],
  bootstrap: [HomeComponent]
})
export class AppModule { }
