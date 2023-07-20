import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../../services/contact/contact.service";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {Contact} from "../../models/Contact.model";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  contactForm : FormGroup;

  constructor(private route: ActivatedRoute,
private formBuilder: FormBuilder,
              private contactService: ContactService,
              private toastService: ToastService) {
    this.contactForm = this.formBuilder.group({
      title: ['', Validators.required],
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      mail: ['', Validators.required],
      phone: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      if(params && params['titleVoiture']) {
        this.contactForm.patchValue({
          title: params['titleVoiture']
        });
      }
    });
  }

  onSubmit(){
    const formData = this.contactForm.value;
    let contact = {
      title: formData.title,
      name: formData.name,
      firstname: formData.firstname,
      mail: formData.mail,
      phone: formData.phone,
      description: formData.description
    }
    this.contactService.sendContact(new Contact(contact)).subscribe((data) => {
      this.toastService.showToaster(ToastType.SUCCESS,'Votre message a bien été envoyé');
    });
  }

  getTitle(){
    if(this.contactForm && this.contactForm.get('title')){
      return this.contactForm.get('title')
    }
    return '';
  }

}
