import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AfficherService } from '../Services/afficher.service';
import { interval } from 'rxjs';
import { AjouterServiceService } from '../Services/ajouter-service.service';
import { StorageService } from '../Services/storage.service';
@Component({
  selector: 'app-avenir',
  templateUrl: 'avenir.page.html',
  styleUrls: ['avenir.page.scss']
})
export class AvenirPage {
  
  idChallenge1: any;
  id: any;
  teamParId: any;
  createur: any;
  equipe: any;
  debut: any;
  fin: any;

  isLoading = true;
  idChallenge: any;
  currentUser: any;
  moi: any;
  donnees: any;

  constructor(private storage: StorageService, private serviceAfficher:AfficherService, private routes: ActivatedRoute,private serviceAjouter:AjouterServiceService,) { }


  challenge:any;
  ngOnInit() {
  
    
    this.currentUser = this.storage.recupererUser();
    console.table(this.currentUser);
    this.moi = this.currentUser.id;
    console.log("je suis id user dans equipe confirmations" + this.moi);

  

   
   
      this.id = this.routes.snapshot.params['id'];
      this.serviceAfficher.recupeId(this.id).subscribe(data=>{
        this.teamParId=data;
        this.createur= this.teamParId.team[0].utilisateurs.nom;
        this.equipe=this.teamParId.team[0].nom;
        this.challenge=this.teamParId.challenge.titre;
        this.debut=this.teamParId.challenge.datedebut;
        this.fin=this.teamParId.challenge.datefin;
        this.idChallenge=this.teamParId.challenge.id;
        console.log("mes par id",this.teamParId.challenge.datefin);
        this.isLoading = false;
     
    })  
  }
  confirmer(){
    console.log("je suis id user dans caonfirmer confirmations" + this.moi , "et team ",this.id , "et challenge",this.idChallenge);
    this.serviceAjouter.confirmer(this.id,this.moi,this.idChallenge).subscribe(data =>{
      this.donnees=data;
      console.log("mes donnees",this.donnees);
    })
  }

  // confirmer(){
  //   console.log("je suis id user dans caonfirmer confirmations" + this.moi , "et team ",this.id , "et challenge",this.idChallenge);
  //   this.serviceAjouter.confirmeré().subscribe(data =>{
  //     this.donnees=data;
  //     console.log("mes donnees",this.donnees);
  //   })
 // }
  

}
