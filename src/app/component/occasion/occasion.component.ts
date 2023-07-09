import { Component } from '@angular/core';
import {Voiture} from "../../models/Voiture.model";
import {DetailPopinComponent} from "../detail-popin/detail-popin.component";
import {VoitureService} from "../../services/voiture/voiture.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-occasion',
  templateUrl: './occasion.component.html',
  styleUrls: ['./occasion.component.css']
})
export class OccasionComponent {
   voitureArray: Array<Voiture>;
   isLoading: boolean;

  constructor(private voitureService : VoitureService,
              public dialog: MatDialog) {
    this.voitureArray = [];
    this.isLoading = true;
  }


  ngOnInit() {
    this.voitureService.getAllVoitures().subscribe(response => {
      response.forEach(reponse => {
        this.voitureArray.push(new Voiture(reponse));
      })
      console.log(this.voitureArray);
      this.isLoading = false;
    });

  }

  openDialog(row : Voiture): void {
    const dialogRef = this.dialog.open(DetailPopinComponent, {
      data: row,
    });

  }

}
