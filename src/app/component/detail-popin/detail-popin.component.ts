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
  options : Array<Option>;
  isLoading : boolean;

  constructor(
    public dialogRef: MatDialogRef<DetailPopinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Voiture,
    private optionService : OptionService,
    private router : Router
  ) {
    this.voiture = new Voiture(data);
    this.options = [];
    this.isLoading = true;
  }

  ngOnInit() {
    this.optionService.getAllOptionByVoitureId(this.voiture.id).subscribe(response => {
      response.forEach(uneOption => {
        this.options.push(new Option(uneOption));
      });
      this.isLoading = false;
    })
  }


  onNoClick() {
    this.dialogRef.close();
  }

  onContact(){
    console.log(this.voiture.denomination);
    this.router.navigate(['/contact'],
      {queryParams: {
        titleVoiture: this.voiture.denomination}})
    this.dialogRef.close();
  }


}
