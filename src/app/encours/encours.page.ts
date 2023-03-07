import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AfficherService } from '../Services/afficher.service';
import { AjouterServiceService } from '../Services/ajouter-service.service';
import { StorageService } from '../Services/storage.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-encours',
  templateUrl: './encours.page.html',
  styleUrls: ['./encours.page.scss'],
})
export class EncoursPage implements OnInit {
  id: any;
  commentaire!: FormGroup
  // dislike!:FormGroup;
  question: any;
  currentUser: any;
  moi: any;
  errorMessage: any;
  status: any;
  commentaireParIdQuestion: any;
  roles: string[] = [];

  form: any = {
    questionid: ''
  }
  form1: any = {
    questionid: ''
  }
  isLoggedIn: any;



  constructor(private serviceAjouter: AjouterServiceService, private serviceAfficher: AfficherService, private storage: StorageService, private routes: ActivatedRoute) { }
  ngOnInit() {

    this.id = this.routes.snapshot.params['id'];

    this.recupererCommontaire()

    this.currentUser = this.storage.recupererUser();
    this.moi = this.currentUser.id;

    this.serviceAfficher.VoirquestionParId(this.id).subscribe(data => {
      this.question = data;
    });
    this.isLoggedIn = this.storage.connexionReussi();

    if (this.isLoggedIn) {
      const user = this.storage.recupererUser();
      this.roles = user.roles;
    }

    this.commentaire = new FormGroup({
      description: new FormControl('', Validators.required),
    });

  }


  onSubmitCommnetaire() {
    const desc = this.commentaire.value.description;
    const creatorId = this.moi;
    const id = this.id;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: ''
      },
      heightAuto: false

    })
    swalWithBootstrapButtons.fire({
      title: "<h1 style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Êtes vous sur de vouloir faire cet commentaire?</h1>",
      showCancelButton: true,
      confirmButtonText: '<span style="font-size:.9em">Confirmer</span>',
      cancelButtonText: `<span style="font-size:.9em"> Annuler</span>`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceAjouter.AjouterCommentaire(creatorId, id, desc).subscribe(data => {
          this.errorMessage = data.message;
          this.status = data.status;
          this.commentaire.reset()
          swalWithBootstrapButtons.fire(
            `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Commentaire envoyé avec succès</h1>`,
          )
          //  setT location.reload()
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '',
          "<h1 style='font-size:.9em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Opération annulée</h1>",
          'error'
        )
        location.reload();

      }
    })
  }



  // =================================================== ON RECUPERE LES COMMENTAIRES ICI
  recupererCommontaire() {
    this.serviceAfficher.VoirCommentaireParId(this.id).subscribe(data => {
      this.commentaireParIdQuestion = data;
    })
  }
  disliker(idcomment: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: ''
      },
      heightAuto: false

    })
  
        const { questionid } = this.form;
        this.serviceAjouter.dislike(idcomment).subscribe(data => {
          this.errorMessage = data.message;
          this.status = data.status;
          swalWithBootstrapButtons.fire(
            `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Commentaire envoyé avec succès</h1>`,
          )
          // location.reload()
        })
      }
  

  liker(idcomment: any) {
    const { questionid } = this.form1;
    this.serviceAjouter.like(idcomment).subscribe(data => {
      this.errorMessage = data.message;
      this.status = data.status;
      location.reload()
    })
  }
}
