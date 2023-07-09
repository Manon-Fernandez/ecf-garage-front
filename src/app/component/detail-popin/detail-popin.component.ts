import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Voiture} from "../../models/Voiture.model";

@Component({
  selector: 'app-detail-popin',
  templateUrl: './detail-popin.component.html',
  styleUrls: ['./detail-popin.component.css']
})
export class DetailPopinComponent {

  voiture : Voiture;

  constructor(
    public dialogRef: MatDialogRef<DetailPopinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.voiture = new Voiture(data);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
