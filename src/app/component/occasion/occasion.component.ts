import {Component, OnInit} from '@angular/core';
import {Voiture} from "../../models/Voiture.model";
import {DetailPopinComponent} from "../detail-popin/detail-popin.component";
import {VoitureService} from "../../services/voiture/voiture.service";
import {MatDialog} from "@angular/material/dialog";
import {min} from "rxjs";

@Component({
  selector: 'app-occasion',
  templateUrl: './occasion.component.html',
  styleUrls: ['./occasion.component.css']
})
export class OccasionComponent implements OnInit{
   voitureArray: Array<Voiture>;
   isLoading: boolean;
   maxPrice: number = 0;
   minPrice: number = 0;
   minKilometers : number = 0;
   maxKilometers : number = 0;
   minAnneeCirculation: number = 0;
   maxAnneeCirculation: number = 0;
   carsFiltered : Array<Voiture>;
   value = 0;
   valuePrix: number;
   valueKilometre: number;
   valueAnneeCirculation: number;

  constructor(private voitureService : VoitureService,
              public dialog: MatDialog) {
    this.voitureArray = [];
    this.isLoading = true;
    this.carsFiltered = [];
    this.valuePrix = 0;
    this.valueKilometre = 0;
    this.valueAnneeCirculation = 0;

  }

  ngOnInit() {
    //appel asynchrone
    this.voitureService.getAllVoitures().subscribe(response => {
      response.forEach(reponse => {
        this.voitureArray.push(new Voiture(reponse));
      })
      this.carsFiltered = this.voitureArray;
      this.isLoading = false;

      //init filtre
      this.maxPrice = Math.max(...this.carsFiltered.map(voiture => voiture.prix));
      this.minPrice = Math.min(...this.carsFiltered.map(voiture => voiture.prix));
      this.minKilometers = Math.min(...this.carsFiltered.map(voiture => voiture.kilometre));
      this.maxKilometers = Math.max(...this.carsFiltered.map(voiture => voiture.kilometre));
      this.minAnneeCirculation = Math.min(...this.carsFiltered.map(voiture => voiture.annee_circulation));
      this.maxAnneeCirculation = Math.max(...this.carsFiltered.map(voiture => voiture.annee_circulation));
      this.initFilter();
    });
  }

  initFilter(){
    this.carsFiltered = this.voitureArray;
    this.valuePrix = this.maxPrice;
    this.valueKilometre = this.maxKilometers;
    this.valueAnneeCirculation = this.maxAnneeCirculation;
  }

  openDialog(row : Voiture): void {
    const dialogRef = this.dialog.open(DetailPopinComponent, {
      data: {
        voiture: row
      },
    });
  }

  onSliderChange() {
    this.carsFiltered = this.voitureArray.filter(voiture => voiture.prix <= this.valuePrix);
    this.carsFiltered = this.carsFiltered.filter(voiture => voiture.kilometre <= this.valueKilometre);
    this.carsFiltered = this.carsFiltered.filter(voiture => voiture.annee_circulation <= this.valueAnneeCirculation);
  }

}

