import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Voiture} from "../../models/Voiture.model";
import {Option} from "../../models/Option.model";
import {OptionService} from "../../services/option/option.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail-popin',
  templateUrl: './detail-popin.component.html',
  styleUrls: ['./detail-popin.component.css']
})
export class DetailPopinComponent implements OnInit{

  voiture : Voiture;
  mode : Mode;

  constructor(
    public dialogRef: MatDialogRef<DetailPopinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private optionService : OptionService,
    private router : Router
  ) {
    this.voiture = new Voiture(data?.voiture);
    this.mode = data?.mode;
  }

  ngOnInit() {
  }


  onNoClick() {
    this.dialogRef.close();
  }

  onContact(){
    this.router.navigate(['/contact'],
      {queryParams: {
        titleVoiture: this.voiture.denomination}})
    this.dialogRef.close();
  }



}

export enum Mode{
  CREATE,
  EDIT
}
