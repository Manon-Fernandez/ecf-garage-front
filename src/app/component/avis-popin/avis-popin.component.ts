import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {Avis, Status} from "../../models/Avis.model";
import {AvisService} from "../../services/avis/avis.service";

@Component({
  selector: 'app-avis-popin',
  templateUrl: './avis-popin.component.html',
  styleUrls: ['./avis-popin.component.css']
})
export class AvisPopinComponent {

  unAvis: Avis;

  constructor(public dialogRef: MatDialogRef<AvisPopinComponent>,
              private formBuilder: FormBuilder,
              private avisService : AvisService) {
    this.unAvis = Object.create(null);
  }


  onSubmit() {
    this.sendData(this.unAvis);
    // Réinitialisez le formulaire après la soumission
    this.dialogRef.close();
  }

  sendData(unAvis : Avis){
    this.unAvis.status = Status.EN_ATTENTE;
    this.avisService.createAvis(unAvis).subscribe(response => {
      console.log('success');
    })
  }

}
