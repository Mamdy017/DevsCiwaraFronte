import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { AfficherService } from '../Services/afficher.service';

@Component({
  selector: 'app-encours',
  templateUrl: './encours.page.html',
  styleUrls: ['./encours.page.scss'],
})
export class EncoursPage implements OnInit {

  
  constructor( private serviceAfficher:AfficherService) { }

  challenge:any;
  ngOnInit() {
    this.serviceAfficher.afficherChallengeEncours().subscribe(data => {
      this.challenge = data;
      console.table(this.challenge);
    });
  }

}
