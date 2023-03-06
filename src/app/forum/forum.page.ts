import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AfficherService } from '../Services/afficher.service';
import { AjouterServiceService } from '../Services/ajouter-service.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {

  id: any;

  // dislike!:FormGroup;

  currentUser: any;
  moi: any;
  errorMessage: any;
  status: any;


  form : any = {
    questionid:''
  }
  form1 : any = {
    questionid:''
  }
  voirQuestionParChallenge: any;



  constructor(private serviceAjouter:AjouterServiceService, private serviceAfficher:AfficherService,private storage: StorageService,  private routes: ActivatedRoute) { }
  ngOnInit() {

    this.id = this.routes.snapshot.params['id'];



    console.log("mon id",this.id)
    this.currentUser = this.storage.recupererUser();
    console.table(this.currentUser);
    this.moi = this.currentUser.id;
    // console.log("je suis id user dans equipe confirmations" + this.moi);

    this.serviceAfficher.Voirqquestion().subscribe(data=>{
      this.voirQuestionParChallenge=data;
    })



  }



}



// =================================================== ON RECUPERE LES COMMENTAIRES ICI





