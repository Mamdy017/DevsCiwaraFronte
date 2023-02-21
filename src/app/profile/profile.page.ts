import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfficherService } from '../Services/afficher.service';
import { ConnexionService } from '../Services/connexion.service';
import { StorageService } from '../Services/storage.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  InscriptionReussi = false;
  Inscriptionechoue = false;
  messageErreur = '';
  connexionReussi = false;
  connexionEchoue = false;

  currentUser: any;
  isLoggedIn: any;
  role: any;
  showAdminBoard: any;
  showModeratorBoard: any;
  username: any;
  profile!: File
  roles: string[] = [];
  errorMessage: any;
  status: any;
  notif: any;
  constructor(private route: Router, private connexion: ConnexionService,
    private storage: StorageService,private serviceAffiche: AfficherService) { }

  ngOnInit() {
    if (this.storage.connexionReussi()) {
      this.connexionReussi = true;
      this.roles = this.storage.recupererUser().roles;
    }

    this.currentUser = this.storage.recupererUser();

    var moi = this.currentUser.id;

    this.isLoggedIn = this.storage.connexionReussi();


  }

  
  onSubmit(): void {
    const { nom, prenom, username, email, numero } = this.currentUser;
    this.currentUser = this.storage.recupererUser();
    var moi = this.currentUser.id;
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
        this.connexion.modifier(moi, username, email, prenom, nom, numero, this.profile).subscribe(data => {
          this.errorMessage = data.message;
          this.status = data.status;

          if (this.status == true) {
            swalWithBootstrapButtons.fire(
              `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
            )
            // this.refreshPage()
          } else if (this.status == false) {
            swalWithBootstrapButtons.fire(
              `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
            )
          }
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

  onFileChangePhoto(event:any) {
    const file = event.target.files[0];
    if (file) {
      this.profile = file;
    }
    // Ajoutez cette ligne pour s'assurer que la valeur de 'value' pour le champ de fichier est vide.
    event.target.value = '';
  }

}
