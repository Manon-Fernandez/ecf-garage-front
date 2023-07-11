import {Component, OnInit} from '@angular/core';
import {Avis} from "../../models/Avis.model";
import {AvisService} from "../../services/avis/avis.service";
import {Status} from "../../models/Avis.model";
import {GarageServiceService} from "../../services/garageService/garage-service.service";
import {Service} from "../../models/Service.model";
import {AvisPopinComponent} from "../avis-popin/avis-popin.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  avisList : Array<Avis>;
  services : Array<Service>;

  constructor(private avisService : AvisService,
              private  garageService : GarageServiceService,
              public dialog: MatDialog) {
    this.avisList = [];
    this.services = [];
  }

  ngOnInit() {
    this.avisService.getAllAvisByStatus(Status.VALIDE).subscribe(avis => {
      avis.forEach(unAvis => {
       this.avisList.push(new Avis(unAvis));
      });
    });
    this.garageService.getAllServices().subscribe(services => {
      services.forEach(service => {
        this.services.push(new Service(service));
      })
    })
  }


  openPopinAvis(){
    const dialogRef = this.dialog.open(AvisPopinComponent);
  }

}
