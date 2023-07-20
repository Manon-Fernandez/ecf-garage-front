import {Component, OnInit} from '@angular/core';
import {VoitureService} from "../../services/voiture/voiture.service";
import {FormBuilder} from "@angular/forms";
import {Voiture} from "../../models/Voiture.model";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {AvisService} from "../../services/avis/avis.service";
import {Avis, Status} from "../../models/Avis.model";
import {MatDialog} from "@angular/material/dialog";
import {CreateVoiturePopinComponent} from "../create-voiture-popin/create-voiture-popin.component";
import {PopinConfirmationComponent} from "../popin-confirmation/popin-confirmation.component";
import {AvisPopinComponent} from "../avis-popin/avis-popin.component";
import {Mode} from "../detail-popin/detail-popin.component";

@Component({
  selector: 'app-employe-dashboard',
  templateUrl: './employe-dashboard.component.html',
  styleUrls: ['./employe-dashboard.component.css']
})
export class EmployeDashboardComponent implements OnInit {

  voitureList: Array<Voiture>;
  lesAvis: Array<Avis>;
  low: number;
  highValue: number;
  displayedColumns: Array<string>;
  displayedColumnsVoiture: Array<string>;
  validation: string;
  suppression: string;
  editer: string;

  constructor(
    private formBuilder: FormBuilder,
    private voitureService: VoitureService,
    private toastService: ToastService,
    private avisService: AvisService,
    public dialog: MatDialog
  ) {
    this.voitureList = [];
    this.lesAvis = [];
    this.low = 0;
    this.highValue = 10;
    this.displayedColumns = ['nom', 'note', 'commentaire', 'status','action'];
    this.validation = 'valider l\'avis';
    this.suppression = 'supprimer';
    this.editer = "mettre à jour";
    this.displayedColumnsVoiture = ['denomination', 'kilometre', 'energie', 'annee_circulation', 'prix', 'action']
  }

  ngOnInit() {
    this.avisService.getAllAvis().subscribe(avisArray => {
      avisArray.forEach(avis => {
        this.lesAvis.push(new Avis(avis));
      })
    })
    this.voitureService.getAllVoitures().subscribe(voitures => {
      voitures.forEach(voiture => {
        this.voitureList.push(new Voiture(voiture));
      })
    })
  }


  checkIfAvisIsSubmitted(element: Avis) {
    return element.status.toString() == "EN_ATTENTE";
  }

  createVoiture() {
    const dialogRef = this.dialog.open(CreateVoiturePopinComponent,{
      data : {
        mode: Mode.CREATE
      }
    });
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      this.voitureList = [];
      this.voitureService.getAllVoitures().subscribe(reponse => {
        reponse.forEach(response => {
          this.voitureList.push(response);
        })
      });
    });
  }

  removeVoiture(element: Voiture) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.voitureService.deleteVoitureById(element.id).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'la suppression a bien été effectuée !');
          this.voitureList = this.voitureList
            .filter(voiture =>voiture.id != element.id);
        })
      }
    });
  }

  validAvis(element: Avis) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.avisService.updateAvisByStatus(element,Status.VALIDE).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'l\'avis a bien été validé !');
          element.status = Status.VALIDE;
        })
      }
    });
  }

  deleteAvis(element: Avis) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.avisService.deleteAvisById(element.id).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'la suppression a bien été effectuée !');
          this.lesAvis = this.lesAvis
            .filter(avis =>avis.id != element.id);
        })
      }
    });
  }

  createAvis() {
    const popin = this.dialog.open(AvisPopinComponent);
    popin.componentInstance.submit.subscribe((response : Avis) => {
      response.status = Status.VALIDE;
      this.avisService.createAvisWithStatus(response,Status.VALIDE).subscribe(reponse => {
        this.toastService.showToaster(ToastType.SUCCESS.toString(),'votre avis a bien été soumis !');
          this.lesAvis = [];
        this.avisService.getAllAvis().subscribe(avis => {
            avis.forEach(unAvis => {
              this.lesAvis.push(new Avis(unAvis));
            });
          });
      })
    });
  }
  editVoiture(element : Voiture) {
    const dialogRef = this.dialog.open(CreateVoiturePopinComponent,{
      data : {
        mode: Mode.EDIT,
        voiture: element
      }
    });
    dialogRef.componentInstance.onUpdate.subscribe(value => {
      this.voitureList = this.voitureList
        .filter(voiture => voiture.id != value.id);
      this.voitureList.push(value);
    })
  }
}
