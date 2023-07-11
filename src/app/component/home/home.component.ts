import {Component, OnInit} from '@angular/core';
import {Avis} from "../../models/Avis.model";
import {AvisService} from "../../services/avis/avis.service";
import {Status} from "../../models/Avis.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  avisList : Array<Avis>;

  constructor(private avisService : AvisService) {
    this.avisList = [];
  }

  ngOnInit() {
    this.avisService.getAllAvisByStatus(Status.VALIDE).subscribe(avis => {
      avis.forEach(unAvis => {
       this.avisList.push(new Avis(unAvis));
      });
    });
  }


}
