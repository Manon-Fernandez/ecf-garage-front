import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
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


const appRoutes: Routes = [
  { path: 'occasion', component: OccasionComponent},
  { path: 'home', component: HomeComponent },
  { path : 'contact', component: ContactComponent},
  {path : 'employe', component: EmployeDashboardComponent},
  {path : 'admin', component: AdminDashboardComponent}
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
    AdminDashboardComponent
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
    MatIconModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
