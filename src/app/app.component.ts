import {Component, OnInit} from '@angular/core';
import {subscriptionLogsToBeFn} from "rxjs/internal/testing/TestScheduler";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title : string;

  constructor(private router : Router) {
    this.title = 'garage Vincent Parrot';
  }

  ngOnInit() {
    this.router.navigateByUrl("home")
  }


}
