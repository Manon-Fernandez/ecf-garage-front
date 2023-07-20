import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../services/auth/auth.service";
import {UserCreate, UserDTO} from "../../models/User.model";
import {Mode} from "../detail-popin/detail-popin.component";

@Component({
  selector: 'app-popin-employe',
  templateUrl: './popin-employe.component.html',
  styleUrls: ['./popin-employe.component.css']
})
export class PopinEmployeComponent {

  signupForm: FormGroup;

  @Output()
  onCreate: EventEmitter<boolean>;
  mode: Mode;
  user: any;


  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<PopinEmployeComponent>,
              public authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.onCreate = new EventEmitter<boolean>();
    this.mode = data?.mode;
    this.user = data?.employe;
    if(this.mode == Mode.CREATE) {
      this.signupForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).{10,}')]]
      });
    }else {
      this.signupForm = this.formBuilder.group({
        username: [this.user?.username, Validators.required],
        password: ['', [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).{10,}')]]
      });
      this.signupForm.get('username')?.disable()
    }
  }

  submit() {
    if (this.signupForm.valid) {
      if (this.mode == Mode.CREATE) {
        const formValue = this.signupForm.value;
        const userCreate = {
          username: formValue['username'],
          password: formValue['password'],
          role: ['EMPLOYE']
        }
        this.authService.register(new UserCreate(userCreate)).subscribe(response => {
          this.onCreate.emit(true);
          this.dialogRef.close();
        });
      } else {
        const formValue = this.signupForm.value;
        const userCreate = {
          username: formValue['username'],
          password: formValue['password'],
          role: ['EMPLOYE']
        }
        this.authService.changePassword(new UserCreate(userCreate)).subscribe(response => {
          this.onCreate.emit(true);
          this.dialogRef.close();
        });
      }
    }
  }

  checkForm() {
    this.signupForm.markAllAsTouched();
  }

  getTitle() {
    if (this.mode == Mode.CREATE) {
      return "Ajouter un employé";
    }
    return "Mettre à jour un employé";
  }

  getButton() {
    if (this.mode == Mode.CREATE) {
      return "Ajouter";
    }
    return "Mettre à jour";
  }
}
