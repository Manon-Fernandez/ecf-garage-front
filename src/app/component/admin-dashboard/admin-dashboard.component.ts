import {Component, OnInit} from '@angular/core';
import {Voiture} from "../../models/Voiture.model";
import {Avis, Status} from "../../models/Avis.model";
import {FormBuilder} from "@angular/forms";
import {VoitureService} from "../../services/voiture/voiture.service";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {AvisService} from "../../services/avis/avis.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateVoiturePopinComponent} from "../create-voiture-popin/create-voiture-popin.component";
import {Mode} from "../detail-popin/detail-popin.component";
import {PopinConfirmationComponent} from "../popin-confirmation/popin-confirmation.component";
import {AvisPopinComponent} from "../avis-popin/avis-popin.component";
import {Service} from "../../models/Service.model";
import {PopinServiceComponent} from "../popin-service/popin-service.component";
import {GarageServiceService} from "../../services/garageService/garage-service.service";
import {HoraireService} from "../../services/horaire/horaire.service";
import {Horaire, Jour} from "../../models/Horaire.model";
import {PopinHoraireComponent} from "../popin-horaire/popin-horaire.component";
import {PopinEmployeComponent} from "../popin-employe/popin-employe.component";
import {UserDTO} from "../../models/User.model";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  voitureList: Array<Voiture>;
  lesAvis: Array<Avis>;
  low: number;
  highValue: number;
  displayedColumnsVoiture: Array<string>;
  suppression: string;
  editer: string;
  services: Array<Service>;
  displayedColumnsService : Array<string>;
  horaires : Array<Horaire>;
  displayedColumnsHoraire: Array<string>;
  jours = Object.keys(Jour);
  employes : Array<UserDTO>;
  displayedColumnsEmploye: string[];

  constructor(
    private formBuilder: FormBuilder,
    private voitureService: VoitureService,
    private toastService: ToastService,
    private avisService: AvisService,
    public dialog: MatDialog,
    private garageService : GarageServiceService,
    private horaireService : HoraireService,
    private userService : UserService

  ) {
    this.voitureList = [];
    this.lesAvis = [];
    this.services = [];
    this.horaires = [];
    this.employes = [];
    this.low = 0;
    this.highValue = 10;
    this.suppression = 'supprimer';
    this.editer = "mettre à jour";
    this.displayedColumnsVoiture = ['denomination', 'kilometre', 'energie', 'annee_circulation', 'prix', 'action']
    this.displayedColumnsService = ['nom','description','action'];
    this.displayedColumnsHoraire = ['jour','heure_ouverture','heure_fermeture','action'];
    this.displayedColumnsEmploye = ['username','action'];
  }

  ngOnInit() {
    this.voitureService.getAllVoitures().subscribe(voitures => {
      voitures.forEach(voiture => {
        this.voitureList.push(new Voiture(voiture));
      })
    });
    this.garageService.getAllServices().subscribe(lesServices => {
      lesServices.forEach(service => {
        this.services.push(new Service(service));
      });
    });
    this.horaireService.getAllHoraires().subscribe(lesHoraires => {
      lesHoraires.forEach(horaire => {
        this.horaires.push(new Horaire(horaire));
      });
    });
    this.userService.getAllUserEmploye().subscribe(employe => {
      employe.forEach(employe => {
        this.employes.push(new UserDTO(employe));
      });
    });
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
          this.toastService.showToaster(ToastType.SUCCESS, 'La suppression a bien été effectuée !');
          this.voitureList = this.voitureList
            .filter(voiture =>voiture.id != element.id);
        })
      }
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

  createServices() {
    const dialogRef = this.dialog.open(PopinServiceComponent, {
      data: {
        mode: Mode.CREATE
      }
    });
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      this.services = [];
      this.garageService.getAllServices().subscribe(reponse => {
        reponse.forEach(response => {
          this.services.push(response);
        })
      });
    });
  }

    editService(element : Service) {
      const dialogRef = this.dialog.open(PopinServiceComponent,{
        data : {
          mode: Mode.EDIT,
          service: element
        }
      });
      dialogRef.componentInstance.onUpdate.subscribe(value => {
        this.services = this.services
          .filter(service => service.id != value.id);
        this.services.push(value);
      })
    }

  removeService(element : Service) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.garageService.deleteServiceById(element.id).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'La suppression a bien été effectuée !');
          this.services = this.services
            .filter(voiture =>voiture.id != element.id);
        })
      }
    });
  }

  getJourAvailable(horaires: Array<Horaire>) : Array<string> {
    let jours : Array<string> = [];
    this.jours.forEach(jour => {
      let isAvailable = true;
      horaires.forEach(horaire => {
        if (horaire.jour == jour) {
          isAvailable = false;
        }
      });
      if (isAvailable) {
        jours.push(jour);
      }
    });
    return jours;

  }

  createHoraire() {
    if(this.getJourAvailable(this.horaires).length > 0) {
      const dialogRef = this.dialog.open(PopinHoraireComponent, {
        data: {
          mode: Mode.CREATE,
          jours: this.getJourAvailable(this.horaires)
        }
      });
      dialogRef.componentInstance.onSubmit.subscribe(event => {
        this.horaireService.createHoraire(event).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'La création a bien été effectuée !');
          this.horaires = [];
          this.horaireService.getAllHoraires().subscribe(reponse => {
            reponse.forEach(response => {
              this.horaires.push(response);
            });
          });
        });
      });
    }
    else {
      this.toastService.showToaster(ToastType.ERROR, 'Il n\'y a plus de jour disponible !');
    }
  }

  removeHoraire(element : Horaire) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.horaireService.deleteHoraireById(element.id).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'La suppression a bien été effectuée !');
          this.horaires = this.horaires
            .filter(horaire =>horaire.id != element.id);
        })
      }
    });
  }

  editHoraire(element : Horaire) {
    const dialogRef = this.dialog.open(PopinHoraireComponent,{
      data : {
        mode: Mode.EDIT,
        horaire: element
      }
    });
    dialogRef.componentInstance.onUpdate.subscribe(value => {
      this.horaireService.updateHoraire(value.id,value).subscribe(response => {
        this.horaires = this.horaires
          .filter(horaire => horaire.id != value.id);
        this.horaires.push(value);
      });
    });
  }

  openPopupEmploye() {
    const dialogRef = this.dialog.open(PopinEmployeComponent, {
      data: {
        mode: Mode.CREATE
      }
    });
    dialogRef.componentInstance.onCreate.subscribe(event => {
      if (event) {
        this.employes = [];
        this.userService.getAllUserEmploye().subscribe(reponse => {
          reponse.forEach(response => {
            this.employes.push(response);
          });
        });
      }
    });
  }

  removeEmploye(element : UserDTO) {
    const dialogRef = this.dialog.open(PopinConfirmationComponent);
    dialogRef.componentInstance.onSubmit.subscribe(event => {
      if (event) {
        this.userService.deleteUserById(element.id).subscribe(response => {
          this.toastService.showToaster(ToastType.SUCCESS, 'La suppression a bien été effectuée !');
          this.employes = this.employes
            .filter(employe =>employe.id != element.id);
        })
      }
    });
  }

  editEmploye(element : UserDTO) {
    const dialogRef = this.dialog.open(PopinEmployeComponent,{
      data : {
        mode: Mode.EDIT,
        employe: element
      }
    });
  }

  protected readonly Object = Object;
  protected readonly Horaire = Horaire;
  protected readonly UserDTO = UserDTO;
}
