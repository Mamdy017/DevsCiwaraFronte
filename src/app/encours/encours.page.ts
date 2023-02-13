import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AfficherService } from '../Services/afficher.service';
import { AjouterServiceService } from '../Services/ajouter-service.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-encours',
  templateUrl: './encours.page.html',
  styleUrls: ['./encours.page.scss'],
})
export class EncoursPage implements OnInit {
  id: any;
  commentaire!:FormGroup

  question:any;
  currentUser: any;
  moi: any;
  errorMessage: any;
  status: any;
  constructor(private serviceAjouter:AjouterServiceService, private serviceAfficher:AfficherService,private storage: StorageService,  private routes: ActivatedRoute) { }
  ngOnInit() {
    this.id = this.routes.snapshot.params['id'];
    console.log("mon id",this.id)
    this.currentUser = this.storage.recupererUser();
    console.table(this.currentUser);
    this.moi = this.currentUser.id;
    console.log("je suis id user dans equipe confirmations" + this.moi);

    this.serviceAfficher.VoirquestionParId(this.id).subscribe(data => {
      this.question = data;
      console.table("mes encours questions par id ",this.question);
    });
    this.commentaire = new FormGroup({
      description: new FormControl('', Validators.required),
    });
  }


  onSubmitCommnetaire(){
    const desc = this.commentaire.value.description;
    const creatorId = this.moi;
    const id = this.id;
    this.serviceAjouter.AjouterCommentaire(creatorId,id,desc).subscribe(data => {
      this.errorMessage = data.message;
      this.status = data.status;
  })
}
}
