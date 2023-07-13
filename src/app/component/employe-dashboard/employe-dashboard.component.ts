import {Component, OnInit} from '@angular/core';
import {VoitureService} from "../../services/voiture/voiture.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Energie, Voiture} from "../../models/Voiture.model";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {AvisService} from "../../services/avis/avis.service";
import {Avis, Status} from "../../models/Avis.model";

@Component({
  selector: 'app-employe-dashboard',
  templateUrl: './employe-dashboard.component.html',
  styleUrls: ['./employe-dashboard.component.css']
})
export class EmployeDashboardComponent implements OnInit{

  voitureForm: FormGroup;
  energies = Object.keys(Energie);
  lesAvis : Array<Avis>;
  low : number;
  highValue : number;
  displayedColumns: Array<string>;
  validation: string;
  suppression: string;

  constructor(
    private formBuilder: FormBuilder,
    private voitureService: VoitureService,
    private toastService: ToastService,
    private avisService: AvisService
  ) {
    this.voitureForm = this.formBuilder.group({
      energie: ['', Validators.required],
      annee_circulation: ['', Validators.required],
      prix: ['', Validators.required],
      //options: ['', Validators.required],
      kilometre: ['', Validators.required],
      description: ['', Validators.required],
      denomination: ['', Validators.required]
    });
    this.lesAvis = [];
    this.low = 0;
    this.highValue = 10;
    this.displayedColumns = ['nom','note','commentaire','action'];
    this.validation = 'valider l\'avis';
    this.suppression = 'supprimer l\'avis'
  }

  ngOnInit() {
    this.avisService.getAllAvis().subscribe(avisArray => {
      avisArray.forEach(avis => {
        this.lesAvis.push(new Avis(avis));
      })
    })
  }

  onSubmit(): void {
    if (this.voitureForm.valid) {
      const formData = this.voitureForm.value;
      const car = {
        energie: formData.energie,
        annee_circulation: formData.annee_circulation,
        prix: formData.prix,
        //options: formData.options,
        kilometre: formData.kilometre,
        description: formData.description,
        denomination: formData.denomination
      };
      let voiture: Voiture = new Voiture(car);
      this.voitureService.createVoiture(voiture).subscribe(() => {
        this.toastService.showToaster(ToastType.SUCCESS.toString(),'GG');
        this.voitureForm.reset();
      });
    }
  }

  checkIfAvisIsSubmitted(element: Avis){
    return Status[element.status] == "EN_ATTENTE";
  }

}
