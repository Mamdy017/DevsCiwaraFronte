import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConxexionPage } from '../conxexion/conxexion.page';
import { ConnexionService } from '../Services/connexion.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  modal: any;
  form: any = {
    username: null,
    email: null,
    password: null
  };
  InscriptionReussi = false;
  Inscriptionechoue = false;
  messageErreur = '';
  constructor(private inscription:ConnexionService, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cancel() {
    this.modal.dismiss();
  }
  onSubmit(): void {
    const { nom, prenom,username,email, password } = this.form;

    this.inscription.inscription(nom, prenom,username,email, password).subscribe({
      next: data => {
        console.log(data);
        this.InscriptionReussi = true;
        this.Inscriptionechoue = false;
      },
      error: err => {
        this.messageErreur = err.error.message;
        this.Inscriptionechoue = true;
      }
    });
  }
  type = true;
  type1 = true;
  changeType() {
      this.type = !this.type;
    }
    changeType1() {
      this.type1 = !this.type1;
    }
    async openModalCon() {
      const modal = await this.modalCtrl.create({
        component: ConxexionPage
      });
      return await modal.present();
    }
}
