import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Energie, Voiture} from "../../models/Voiture.model";
import {Option} from "../../models/Option.model";
import {Mode} from "../detail-popin/detail-popin.component";
import {VoitureService} from "../../services/voiture/voiture.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {Service} from "../../models/Service.model";
import {GarageServiceService} from "../../services/garageService/garage-service.service";

@Component({
  selector: 'app-popin-service',
  templateUrl: './popin-service.component.html',
  styleUrls: ['./popin-service.component.css']
})
export class PopinServiceComponent {

  serviceForm: FormGroup;
  @Output()
  onSubmit : EventEmitter<Service>;
  @Output()
  onUpdate : EventEmitter<Service>;

  mode: Mode;
  id : number = Object.create(null);


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopinServiceComponent>,
    private toastService: ToastService,
    private garageService : GarageServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onUpdate = new EventEmitter<Service>;
    this.mode = data?.mode;
    if(data?.service && this.mode == Mode.EDIT){
      this.id = data?.service.id;
      this.serviceForm = this.formBuilder.group({
        nom: [data.service.nom, Validators.required],
        description: [data.service.description, Validators.required]
      });
    }
    else{
      this.serviceForm = this.formBuilder.group({
        nom: ['', Validators.required],
        description:['',Validators.required]
      });
    }

    this.onSubmit = new EventEmitter<Service>();
  }

  submit(): void {
    if (this.serviceForm.valid) {

      const formData = this.serviceForm.value;
      const service = {
        id: this.mode === Mode.EDIT ? this.id : null,
        nom: formData.nom,
        description: formData.description
      };
      let unService: Service = new Service(service);
      if(this.mode == Mode.CREATE) {
        this.garageService.createService(unService).subscribe(() => {
          this.toastService.showToaster(ToastType.SUCCESS.toString(), 'le service a bien été sauvegardé !');
          this.onSubmit.emit(unService);
          this.dialogRef.close();
        });
      } else if (this.mode == Mode.EDIT){
        this.garageService.updateService(unService.id,unService).subscribe(() => {
          this.toastService.showToaster(ToastType.SUCCESS.toString(), 'le service a bien été mise à jour !');
          this.onUpdate.emit(unService);
          this.dialogRef.close();
        })

      }

    }
  }

  closePopin() {
    this.dialogRef.close();
  }

  getTitle(){
    if(this.mode == Mode.EDIT){
      return "Modification d'un service"
    }else if(this.mode == Mode.CREATE){
      return "Creation d'un service"
    }
    return '';
  }

  getSubmitButton(){
    if(this.mode == Mode.EDIT){
      return "Mise à jour"
    }else if(this.mode == Mode.CREATE){
      return "Créer"
    }
    return '';
  }

}
