import { Component } from '@angular/core';
import { AfficherService } from '../Services/afficher.service';

@Component({
  selector: 'app-terminer',
  templateUrl: 'terminer.page.html',
  styleUrls: ['terminer.page.scss']
})
export class TerminerPage {
  constructor( private serviceAfficher:AfficherService) { }

  challenge:any;
  ngOnInit() {
    this.serviceAfficher.afficherChallengeTerminer().subscribe(data => {
      this.challenge = data;
      console.table(this.challenge);
    });
  }
}
