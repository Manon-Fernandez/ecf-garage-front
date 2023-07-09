import {Component, OnInit} from '@angular/core';
import {Horaire} from "../../models/Horaire.model";
import {HoraireService} from "../../services/horaire/horaire.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  horaires: Array<Horaire>;
  isLoading: boolean;

  constructor(private horaireService : HoraireService) {
    this.horaires = [];
    this.isLoading = true;
  }

  ngOnInit(){
    this.horaireService.getAllHoraires().subscribe(response => {
       response.forEach(reponse => {
         this.horaires.push(new Horaire(reponse));
       })
      this.isLoading = false;
    })

  }

}
