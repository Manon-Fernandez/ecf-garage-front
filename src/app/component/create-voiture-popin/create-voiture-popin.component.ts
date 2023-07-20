import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Energie, Voiture} from "../../models/Voiture.model";
import {VoitureService} from "../../services/voiture/voiture.service";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Option} from "../../models/Option.model";
import {Mode} from "../detail-popin/detail-popin.component";

@Component({
  selector: 'app-create-voiture-popin',
  templateUrl: './create-voiture-popin.component.html',
  styleUrls: ['./create-voiture-popin.component.css']
})
export class CreateVoiturePopinComponent {

  voitureForm: FormGroup;
  energies = Object.keys(Energie);

  @Output()
  onSubmit : EventEmitter<Voiture>;
  @Output()
  onUpdate : EventEmitter<Voiture>;

  formGroup: FormGroup;
  availableOptions: string[] = [];
  selectedOptions: Array<Option> = [];
  mode: Mode;
  id : number = Object.create(null);


  constructor(
    private formBuilder: FormBuilder,
    private voitureService: VoitureService,
    public dialogRef: MatDialogRef<CreateVoiturePopinComponent>,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.onUpdate = new EventEmitter<Voiture>;
    this.mode = data?.mode;
    if(data?.voiture && this.mode == Mode.EDIT){
      this.id = data?.voiture.id;
      this.voitureForm = this.formBuilder.group({
        energie: [data.voiture.energie, Validators.required],
        annee_circulation: [data.voiture.annee_circulation, Validators.required],
        prix: [data.voiture.prix, Validators.required],
        kilometre: [data.voiture.kilometre, Validators.required],
        description: [data.voiture.description, Validators.required],
        denomination: [data.voiture.denomination, Validators.required]
      });
      this.selectedOptions = data.voiture.options;
      this.availableOptions = this.selectedOptions.map(o => o.nom);
      this.formGroup = this.formBuilder.group({options: []});
    }
    else{
      this.voitureForm = this.formBuilder.group({
        energie: ['', Validators.required],
        annee_circulation: ['', Validators.required],
        prix: ['', Validators.required],
        kilometre: ['', Validators.required],
        description: ['', Validators.required],
        denomination: ['', Validators.required]
      });
      this.formGroup = this.formBuilder.group({options: ['']});
    }

    this.onSubmit = new EventEmitter<Voiture>();
  }

  submit(): void {
    if (this.voitureForm.valid) {

        const formData = this.voitureForm.value;
        const car = {
          id: this.mode === Mode.EDIT ? this.id : null,
          energie: formData.energie,
          annee_circulation: formData.annee_circulation,
          prix: formData.prix,
          kilometre: formData.kilometre,
          description: formData.description,
          denomination: formData.denomination,
          options: this.selectedOptions
        };
        let voiture: Voiture = new Voiture(car);
      if(this.mode == Mode.CREATE) {
        this.voitureService.createVoiture(voiture).subscribe(() => {
          this.toastService.showToaster(ToastType.SUCCESS.toString(), 'L\'annonce a bien été sauvegardé !');
          this.onSubmit.emit(voiture);
          this.dialogRef.close();
        });
      } else if (this.mode == Mode.EDIT){
        this.voitureService.updateVoiture(voiture.id,voiture).subscribe(() => {
          this.toastService.showToaster(ToastType.SUCCESS.toString(), 'L\'annonce a bien été mise à jour !');
          this.onUpdate.emit(voiture);
          this.dialogRef.close();
        })

      }

    }
  }

  closePopin() {
    this.dialogRef.close();
  }

  updateSelectedOptions(option: string, event: any) {
    if (event.checked) {
      this.selectedOptions.push(new Option({
        'nom':option
      }));
    } else {
      this.selectedOptions = this.selectedOptions.filter(o => o.nom !== option);
    }
  }

  addOption() {
    let value = this.formGroup.value;
    if (value.options.length > 0) {
      this.availableOptions.push(value.options);
      this.formGroup.addControl(value.options, new FormControl(false));
      this.formGroup.value.options = '';
    }
  }

  getmaxYear() {
    return new Date().getFullYear();
  }

  getminYear() {
    return new Date().getFullYear()-150;
  }

  getTitle(){
    if(this.mode == Mode.EDIT){
      return "Modification d'une voiture"
    }else if(this.mode == Mode.CREATE){
      return "Creation d'une voiture"
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

  checkIfOptionAreAffected(option: string) : boolean {
    return this.selectedOptions
      .filter(o => o.nom == option).length > 0;
  }
}
