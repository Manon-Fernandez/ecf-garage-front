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


const appRoutes: Routes = [
  { path: 'occasion', component: OccasionComponent},

  { path: 'home', component: HomeComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    DetailPopinComponent,
    OccasionComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent
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
    RouterModule.forRoot(appRoutes)
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
