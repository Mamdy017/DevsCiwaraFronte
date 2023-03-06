import { Component, OnInit } from '@angular/core';
import { AfficherService } from '../Services/afficher.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.page.html',
  styleUrls: ['./challenge.page.scss'],
})
export class ChallengePage implements OnInit {
  type = 'deposit';
  content: number = 1;
  activeOption = 1;
  challengeEncours: any;
  challengeTerminer: any;
  challengeAvenir: any;
  decroissant: any;

  showContent(opt: number) {
    this.content = opt;
}

  constructor( private serviceAfficher:AfficherService) { }


  challenge:any;
  ngOnInit() {
    this.serviceAfficher.afficherChallengeAvenir().subscribe(data => {
      this.challengeAvenir = data;
    });
    this.serviceAfficher.afficherChallengeEncours().subscribe(data => {
      this.challengeEncours = data;
      
    });
    this.serviceAfficher.afficherChallengeTerminer().subscribe(data => {
      this.challengeTerminer = data;
     
    });
    this.serviceAfficher.afficherChallengeDecroissant().subscribe(data => {
      this.decroissant = data;
     
    });
  // }
  // ngDoCheck() {
  //   if (this.data !== this.previousData) {
  //       this.previousData = this.data;
  //       // Traitement des données
  //   }
}
segmentChanged(ev: any) {
}

}
