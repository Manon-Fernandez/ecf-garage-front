import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './component/root/app.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { DetailPopinComponent } from './component/detail-popin/detail-popin.component';
import {MatDialogModule} from "@angular/material/dialog";
import { OccasionComponent } from './component/occasion/occasion.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import {ActivatedRoute, RouterLink, RouterModule, RouterOutlet, Routes} from "@angular/router";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import { ContactComponent } from './component/contact/contact.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { AvisPopinComponent } from './component/avis-popin/avis-popin.component';
import { EmployeDashboardComponent } from './component/employe-dashboard/employe-dashboard.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import {ToastrModule} from "ngx-toastr";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import { CreateVoiturePopinComponent } from './component/create-voiture-popin/create-voiture-popin.component';
import { PopinConfirmationComponent } from './component/popin-confirmation/popin-confirmation.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { PopinServiceComponent } from './component/popin-service/popin-service.component';
import { PopinHoraireComponent } from './component/popin-horaire/popin-horaire.component';
import {AuthGuard} from "./guard/guard.guard";
import { LoginComponent } from './component/login/login.component';
import { PopinEmployeComponent } from './component/popin-employe/popin-employe.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import { FlexLayoutModule } from '@angular/flex-layout';

const appRoutes: Routes = [
  { path: 'occasion', component: OccasionComponent},
  { path: 'home', component: HomeComponent },
  { path : 'contact', component: ContactComponent},
  {path : 'employe', component: EmployeDashboardComponent , canActivate: [AuthGuard]},
  {path : 'admin', component: AdminDashboardComponent , canActivate: [AuthGuard]},
  {path : 'login', component: LoginComponent},
  {path : '**', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DetailPopinComponent,
    OccasionComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ContactComponent,
    AvisPopinComponent,
    EmployeDashboardComponent,
    AdminDashboardComponent,
    CreateVoiturePopinComponent,
    PopinConfirmationComponent,
    PopinServiceComponent,
    PopinHoraireComponent,
    LoginComponent,
    PopinEmployeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    RouterOutlet,
    RouterLink,
    RouterModule.forRoot(appRoutes),
    MatSliderModule,
    FormsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatOptionModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    FlexLayoutModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
