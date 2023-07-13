import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Avis, Status} from "../../models/Avis.model";
import {AvisService} from "../../services/avis/avis.service";
import {ToastService, ToastType} from "../../services/toast/toast.service";

@Component({
  selector: 'app-avis-popin',
  templateUrl: './avis-popin.component.html',
  styleUrls: ['./avis-popin.component.css']
})
export class AvisPopinComponent {

  unAvis: Avis;
  maxValue : number;
  avisForm: FormGroup;

  @Output()
  submit : EventEmitter<Avis>;

  constructor(public dialogRef: MatDialogRef<AvisPopinComponent>,
              private formBuilder: FormBuilder) {
    this.unAvis = Object.create(null);
    this.maxValue = 10;
    this.avisForm = this.formBuilder.group({
      commentaire: ['', Validators.required],
      nom: ['', Validators.required],
      note: ['', Validators.required],
    });
    this.submit = new EventEmitter<Avis>;
  }


  onSubmit() {
    if(this.avisForm.valid) {
      const formData = this.avisForm.value;
      const avis = {
        'commentaire' : formData.commentaire,
        'nom': formData.nom,
        'note': formData.note
      }
      this.submit.emit(new Avis(avis));
      // Réinitialisez le formulaire après la soumission
      this.dialogRef.close();
    }
  }


}
