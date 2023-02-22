import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
import { InscriptionPage } from '../inscription/inscription.page';
import { ConnexionService } from '../Services/connexion.service';
import { StorageService } from '../Services/storage.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-conxexion',
  templateUrl: './conxexion.page.html',
  styleUrls: ['./conxexion.page.scss'],
})
export class ConxexionPage implements OnInit {


  form: any = {
    usernameOrEmail: null,
    password: null
  };
  connexionReussi = false;
  connexionEchoue = false;
  messageErreur = '';

  currentUser: any;
  isLoggedIn: any;
  role: any;
  showAdminBoard: any;
  showModeratorBoard: any;
  username: any;

  eventBusService: any;

  roles: string[] = [];
  modal: any;
  status: any;
  constructor(private connexion: ConnexionService,
    private storage: StorageService,
    private router: Router, private modalCtrl: ModalController) { }


  ngOnInit() {
  }

  onSubmit(): void {
    // this.refreshPage();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: ''
      },
      heightAuto: false

    })
    const { usernameOrEmail, password } = this.form;

    this.connexion.login(usernameOrEmail, password).subscribe({
      next: data => {
        this.status = data.status;
        this.messageErreur = data.message
        if (this.status == false) {
          swalWithBootstrapButtons.fire(
            '',
            `<h1  style='font-size:1.5em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.messageErreur}.</h1>`,
            'error' )
        } else {
          this.storage.enregistrer(data);

          this.connexionEchoue = false;
          this.connexionReussi = true;

          this.storage.connexionReussi();

          this.storage.enregistrer(data);

          this.connexionEchoue = false;
          this.connexionReussi = true;

          this.storage.connexionReussi();

          if (data) {

            this.roles = this.storage.recupererUser().roles;

            // alert("hello")
            // this.refreshPage();
            this.router.navigateByUrl("/menu/accueil");
            this.modalCtrl.dismiss();
          }
        }

      },
      error: err => {
        this.messageErreur = err.error.message;
        this.connexionEchoue = true;
      }
    });

  }
  cancel() {
    this.modal.dismiss();
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordPage
    });
    return await modal.present();
  }
  async openModalIn() {
    const modal = await this.modalCtrl.create({
      component: InscriptionPage
    });
    return await modal.present();
  }

  type = true;
  changeType() {
    this.type = !this.type;
  }

  refreshPage() {
    location.reload();
  }

}
