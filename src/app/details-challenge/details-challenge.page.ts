import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonAccordionGroup } from '@ionic/angular';
import { AfficherService } from '../Services/afficher.service';
import { AjouterServiceService } from '../Services/ajouter-service.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-details-challenge',
  templateUrl: './details-challenge.page.html',
  styleUrls: ['./details-challenge.page.scss'],
})
export class DetailsChallengePage implements OnInit {
  [x: string]: any;
  errorMessage: string = "";
  type = 'deposit';
  equipe!: FormGroup;
  formUsers!: FormGroup;
  content = 1;
  activeOption = 1;
  idChallenge: any;
  titre: any;
  description: any;
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
  selectedUsers!: any[];

  submitForm() {
    console.log(this.selectedUsers);
    // Traitez les valeurs sélectionnées ici
  }

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
  form !: FormGroup


  ngOnInit() {
    if (this.storage.connexionReussi()) {
      this.connexionReussi = true;
      this.roles = this.storage.recupererUser().roles;
    }
    this.serviceAfficher.graphiqueUser().subscribe(data => {
      this.users = data;
      // console.log("mes ids", this.users)
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

   

    this.currentUser = this.storage.recupererUser();
    // console.table(this.currentUser);
    var moi = this.currentUser.id;
    this.idChallenge1 = this.routes.snapshot.params['idChallenge1'];

    this.serviceAfficher.afficherParIdChallenge(this.idChallenge1).subscribe(data => {
      this.idChallenge = data;
      this.titre = data.titre;
      this.description = data.description;
      this.datefin = data.datefin;
      this.cate = data.cate[0].nom;
      this.photo = data.photo;
      this.datedebut = data.datedebut;

    });
    this.serviceAfficher.afficherCritereParIdChallenge(this.idChallenge1).subscribe(data => {
      this.critere = data;
      // console.log("mes eeeeeee", JSON.stringify(this.critere));
    });
    this.serviceAfficher.classements(this.idChallenge1).subscribe(data => {
      this.classement = data;
      // console.log("mes classements", JSON.stringify(this.classement))
    });

    this.serviceAfficher.afficherEquipeParUtilisateur(this.idChallenge1, moi).subscribe(data => {
      this.afficherEquipeParUtilisateur = data;
      // console.log("teammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm" + JSON.stringify(this.afficherEquipeParUtilisateur[0].id) + "idusers"+ moi);
      var idTeam1 = this.afficherEquipeParUtilisateur[0].id;
      this.idTeam = this.afficherEquipeParUtilisateur[0].id;
      // console.log("id teams" + idTeam1);

      this.serviceAfficher.afficherEquipeMembre(this.idChallenge1, idTeam1).subscribe(data => {
        this.afficherEquipeMembre1 = data;
      });
    });

    this.serviceAfficher.afficherUtilisateur().subscribe(data => {
      this.utilisateurAffichage = data;
      //  console.log("mes users" + JSON.stringify(this.utilisateurAffichage)+ "et id" + this.utilisateurAffichage[0].id);

    });

    this.equipe = new FormGroup({
      nom: new FormControl('', Validators.required),
    });
    this.formUsers = new FormGroup({
      idseurs: new FormControl(''),
    });

    this.currentUser = this.storage.recupererUser();
    // console.table(this.currentUser);
    this.iduser1 = this.currentUser.id;
    moi = this.currentUser.id;
  }
  @ViewChild('accordionGroup', { static: true })
  accordionGroup!: IonAccordionGroup;

  toggleAccordion = () => {
    const nativeEl = this.accordionGroup;
    if (nativeEl.value === 'second') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'second';
    }
  };

  onSubmitEquipe() {
    const team = this.equipe.value.nom;
    const creatorId = this.iduser1;
    const challengeId = this.idChallenge1;
    this.serviceAjouter.AjouterTeam(team, creatorId, challengeId).subscribe(data => {
      this.errorMessage = data.message;
      this.status = data.status;
      this.equipe.reset();
    });

  }
  // onSubmitUsers(){
  //   const formData = new FormData();
  //   formData.append('userIds', this.formUsers.value.idseurs);
  //   console.log("avant" + this.formUsers.value.idseurs);
  //   this.serviceAjouter.AjouterUserEquipe(formData).subscribe(data => {
  //     console.log("mmmm" + JSON.stringify(data))
  //     this.formUsers.reset();
  //   });
  // }
  uploadFilec(files: FileList) {
    this.form.value.source.setValue(files.item(0));
  }
  uploadFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.form.patchValue({
        fileSource: file

      });
    }
  }
  submit() {
    const formData = new FormData();
    formData.append('lienGithub', this.form.value.lienGithub);
    formData.append('source', this.form.value.fileSource, this.form.value.fileSource.name);
    formData.append('point', this.form.value.point);
    console.log("hfhfh" + this.form.value.fileSource.name)
    this.serviceAjouter.ajouterSolution(this.idChallenge1, this.idTeam, this.iduser1, formData).subscribe(data => {
      this.errorMessage = data.message;
      this.status = data.status;
      this.equipe.reset();
    })
    // this.http.post<any>(`http://localhost:8080/devs/auth/solution/ajout/${this.idChallenge1}/${this.idTeam}/${this.iduser1}`, formData)
    //   .subscribe(
    //     (res) => console.log(res),
    //     (err) => console.error(err)
    //   );
  }
  // onSubmit() {
  //   console.log("mes avants" + this.userIds.split(',').map(id => +id));
  //   this.serviceAjouter.addTeamUsersToTeamForChallenge(this.userIds.split(',').map(id => +id), this.teamId, this.challengeId)
  //     .subscribe(response => {
  //       this.message = response.message;
  //       this.success = response.success;
  //     });
  // }

  submitEquipe() {
    this.serviceAjouter.addTeamUsersToTeamForChallenge([3, 1, 4], 1, 4)
      .subscribe(res => {
        console.log(res);
      });
  }
  // submitEquipe(){
  //   var userIds = this.formUser.value.utilisate;
  //   console.log("mes ========================================= " + userIds);
  //   this.serviceAjouter.addTeamUsersToTeamForChallenge(this.idTeam, this.idChallenge1,userIds)
  //   .subscribe(res => {
  //     console.log(res);
  //   });
  // }

  // submitEquipe() {
  //   console.log("je suis ======================================la",this.formUser.value.get('utilisate'));
  // }

  // submitEquipe() {
  //   console.log("mes desss ", this.formUser.value.utilisate);
  // }

  


  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
function saveAs(body: any, fileName: string) {
  throw new Error('Function not implemented.');
}

