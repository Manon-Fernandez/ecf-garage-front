import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  contactForm : FormGroup;

  constructor(private route: ActivatedRoute,
private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      if(params && params['titleVoiture']) {
        this.contactForm.patchValue({
          title: params['titleVoiture']
        });
        console.log(params['titleVoiture']);
      }
    });
  }

  onSubmit(){

  }

  getTitle(){
    if(this.contactForm && this.contactForm.get('title')){
      return this.contactForm.get('title')
    }
    return '';
  }

}
