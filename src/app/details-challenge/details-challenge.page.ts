import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonAccordionGroup } from '@ionic/angular';
import { AfficherService } from '../Services/afficher.service';
import { AjouterServiceService } from '../Services/ajouter-service.service';
import { StorageService } from '../Services/storage.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-details-challenge',
  templateUrl: './details-challenge.page.html',
  styleUrls: ['./details-challenge.page.scss'],
})
export class DetailsChallengePage implements OnInit {

  errorMessage: string = "";
  type = 'deposit';
  equipe!: FormGroup;
  question!:FormGroup;
  formUsers!: FormGroup;
  content = 1;
  activeOption = 1;
  idChallenge: any;
  titre: any;
  description: any;
  showSolutionButton: boolean = false;
  datefin: any;
  cate: any;
  datedebut: any;
  photo: any;
  critere: any;
  iduser1: any;
  idChallenge1!: number;
  utilisateurAffichage: any;
  response!: Object;
  userIds!: string;
  teamId!: number;
  challengeId!: number;
  message!: string;
  success!: boolean;
  connexionReussi = false;
  connexionEchoue = false;
  messageErreur = '';
  afficherEquipeMembre1: any;
  afficherEquipeParUtilisateur: any;
  currentUser: any;
  isLoggedIn: any;
  status: any;
  idTeam: any;
  users: any;
  classement: any;
  roles: string[] = [];
  formUser!: FormGroup;
  isLoading = true;
  allQuestion: any;
  voirQuestionParChallenge: any;
  etat: any;
  form !: FormGroup
  form1 !: FormGroup
  showContent(opt: number) {
    this.content = opt;
  }

  constructor(
    private route: Router,
    private routes: ActivatedRoute,
    private serviceAfficher: AfficherService,
    private serviceAjouter: AjouterServiceService,
    private storage: StorageService, private http: HttpClient,
    private fb: FormBuilder
  ) { }


  ngOnInit() {
    if (this.storage.connexionReussi()) {
      this.connexionReussi = true;
      this.roles = this.storage.recupererUser().roles;
    }
    this.serviceAfficher.graphiqueUser().subscribe(data => {
      this.users = data;
    })
    this.serviceAfficher.Voirqquestion().subscribe(data =>{
      this.allQuestion=data;
    })


    this.formUser = new FormGroup({
      utilisate: new FormControl([])

    })
    this.isLoggedIn = this.storage.connexionReussi();

    if (this.isLoggedIn) {
      const user = this.storage.recupererUser();
      this.roles = user.roles;
    }

    this.form = new FormGroup({
      lienGithub: new FormControl('', Validators.required),
      point: new FormControl('', Validators.required),
      source: new FormControl('', Validators.required),
      fileSource: new FormControl('', [Validators.required])
    });

    this.form1 = new FormGroup({
      lienGithub1: new FormControl('', Validators.required),
      point1: new FormControl('', Validators.required),
      source1: new FormControl('', Validators.required),
      fileSource1: new FormControl('', [Validators.required])
    });


    this.currentUser = this.storage.recupererUser();
    var moi = this.currentUser.id;
    this.idChallenge1 = this.routes.snapshot.params['idChallenge1'];

    this.serviceAfficher.VoirquestionParChallenge(this.idChallenge1).subscribe(data=>{
      this.voirQuestionParChallenge=data;
    })
    this.serviceAfficher.afficherParIdChallenge(this.idChallenge1).subscribe(data => {
      this.idChallenge = data;
      this.titre = data.titre;
      this.description = data.description;
      this.datefin = data.datefin;
      this.etat=data.etat;
      this.cate = data.cate[0].nom;
      this.photo = data.photo;
      this.datedebut = data.datedebut;


    });
    this.serviceAfficher.afficherCritereParIdChallenge(this.idChallenge1).subscribe(data => {
      this.critere = data;
      this.isLoading = false;
    });
    this.serviceAfficher.classements(this.idChallenge1).subscribe(data => {
      this.classement = data;
    });

    this.serviceAfficher.afficherEquipeParUtilisateur(this.idChallenge1, moi).subscribe(data => {
      this.afficherEquipeParUtilisateur = data;
      var idTeam1 = this.afficherEquipeParUtilisateur[0].id;
      this.idTeam = this.afficherEquipeParUtilisateur[0].id;
      this.serviceAfficher.afficherEquipeMembre(this.idChallenge1, idTeam1).subscribe(data => {
        this.afficherEquipeMembre1 = data;
      });
    });

    this.serviceAfficher.afficherUtilisateur().subscribe(data => {
      this.utilisateurAffichage = data;
    });

    this.equipe = new FormGroup({
      nom: new FormControl('', Validators.required),
    });
    this.question = new FormGroup({
      question: new FormControl('', Validators.required),
    });


    this.currentUser = this.storage.recupererUser();
    this.iduser1 = this.currentUser.id;
    moi = this.currentUser.id;
  }
  // =================================Ajout d'une equipe ====================================================

  onSubmitEquipe() {
    const team = this.equipe.value.nom;
    const creatorId = this.iduser1;
    const challengeId = this.idChallenge1;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: ''
      },
      heightAuto: false

    })

    swalWithBootstrapButtons.fire({
      title: "<h1 style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Êtes vous sur de vouloir confimer?</h1>",
      showCancelButton: true,
      confirmButtonText: '<span style="font-size:.9em">Confirmer</span>',
      cancelButtonText: `<span style="font-size:.9em"> Annuler</span>`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceAjouter.AjouterTeam(team, creatorId, challengeId).subscribe(data => {
          this.errorMessage = data.message;
          this.status = data.status;
          if (this.status == true) {
            swalWithBootstrapButtons.fire(
              `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
            )
            this.equipe.reset();
            location.reload();
          } else if (this.status == false) {
            swalWithBootstrapButtons.fire(
              `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
            )
          }
          //
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '',
          "<h1 style='font-size:.9em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Opération annulée</h1>",
          'error'
        )
      }
    })


  }



  onSubmitQuestion() {
    const question = this.question.value.question;
    const creatorId = this.iduser1;
    const challengeId = this.idChallenge1;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: ''
      },
      heightAuto: false

    })

    swalWithBootstrapButtons.fire({
      title: "<h1 style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Êtes vous sur de vouloir poser cette question?</h1>",
      showCancelButton: true,
      confirmButtonText: '<span style="font-size:.9em">Confirmer</span>',
      cancelButtonText: `<span style="font-size:.9em"> Annuler</span>`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceAjouter.question(challengeId , creatorId, question).subscribe(data => {
          this.errorMessage = data.message;
          this.status = data.status;
          if (this.status == true) {
            swalWithBootstrapButtons.fire(
              `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
            )
            this.equipe.reset();
            location.reload();
          } else if (this.status == false) {
            swalWithBootstrapButtons.fire(
              `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
            )
          }
          //
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '',
          "<h1 style='font-size:.9em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Opération annulée</h1>",
          'error'
        )
      }
    })


  }


  uploadFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      });
    }
  }
  uploadFileuser(event: any) {
    if (event.target.files.length > 0) {
      const file1 = event.target.files[0];
      this.form1.patchValue({
        fileSource1: file1
      });
    }
  }

  // =========================================Ajout d'une solution par l'equipe=====================
  submit() {
    const formData = new FormData();
    formData.append('lienGithub', this.form.value.lienGithub);
    formData.append('source', this.form.value.fileSource, this.form.value.fileSource.name);
    // formData.append('point', this.form.value.point);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: ''
      },
      heightAuto: false

    })
    swalWithBootstrapButtons.fire({
      title: "<h1 style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Êtes vous sur de vouloir ajouter la solution?</h1>",
      showCancelButton: true,
      confirmButtonText: '<span style="font-size:.9em">Confirmer</span>',
      cancelButtonText: `<span style="font-size:.9em"> Annuler</span>`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceAjouter.ajouterSolution(this.idChallenge1, this.idTeam, this.iduser1, formData).subscribe(data => {
          this.errorMessage = data.message;
          this.status = data.status;

          if (this.status == true) {

            swalWithBootstrapButtons.fire(
              `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
            )
            this.form.reset();
            location.reload();
          } else if (this.status == false) {
            swalWithBootstrapButtons.fire(
              `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; color:red'>${this.errorMessage}.</h1>`,
            )
          }
          // this.equipe.reset();
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '',
          "<h1 style='font-size:.9em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Opération annulée</h1>",
          'error'
        )
      }
    })



  }

  submit2() {
    const formData = new FormData();
    formData.append('lienGithub', this.form1.value.lienGithub1);
    formData.append('source', this.form1.value.fileSource1, this.form1.value.fileSource1.name);
    // formData.append('point', this.form.value.point);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: ''
      },
      heightAuto: false

    })
    swalWithBootstrapButtons.fire({
      title: "<h1 style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Êtes vous sur de vouloir ajouter la solution?</h1>",
      showCancelButton: true,
      confirmButtonText: '<span style="font-size:.9em">Confirmer</span>',
      cancelButtonText: `<span style="font-size:.9em"> Annuler</span>`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceAjouter.ajouterSolutionUsers(this.idChallenge1, this.iduser1, formData).subscribe(data => {
          this.errorMessage = data.message;
          this.status = data.status;

          if (this.status == true) {

            swalWithBootstrapButtons.fire(
              `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
            )
            this.form.reset();
            location.reload();
          } else if (this.status == false) {
            swalWithBootstrapButtons.fire(
              `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; color:red'>${this.errorMessage}.</h1>`,
            )
          }
          // this.equipe.reset();
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '',
          "<h1 style='font-size:.9em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Opération annulée</h1>",
          'error'
        )
      }
    })



  }

  // isChallengeInProgress(startDate: string): boolean {
  //   const challengeStartDate = new Date(startDate.split('T')[0]);
  //   const currentDate = new Date();
  //   return challengeStartDate <= currentDate;
  // }
  submitEquipe1() {
    var userIds = this.formUser.value.utilisate;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: ''
      },
      heightAuto: false

    })
    swalWithBootstrapButtons.fire({
      title: "<h1 style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Êtes vous sur de vouloir ajouter ces personnes à votre équipe?</h1>",
      showCancelButton: true,
      confirmButtonText: '<span style="font-size:.9em">Confirmer</span>',
      cancelButtonText: `<span style="font-size:.9em"> Annuler</span>`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceAjouter.addTeamUsersToTeamForChallenge(userIds, this.idTeam, this.idChallenge1)
        .subscribe(data => {
          this.errorMessage = data.message;
          this.status = data.status;

          if (this.status == true) {

            swalWithBootstrapButtons.fire(
              `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
            )
            this.form.reset();
            location.reload();
          } else if (this.status == false) {
            swalWithBootstrapButtons.fire(
              `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; color:red'>${this.errorMessage}.</h1>`,
            )
          }
          // this.equipe.reset();
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '',
          "<h1 style='font-size:.9em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Opération annulée</h1>",
          'error'
        )
      }
    })

  }

  segmentChanged(ev: any) {
  }
  toggleSolutionButton() {
    this.showSolutionButton = !this.showSolutionButton;
  }

  toggleShowSolution() {
    this.showSolutionButton = !this.showSolutionButton;
  }
}
function saveAs(body: any, fileName: string) {
  throw new Error('Function not implemented.');
}

