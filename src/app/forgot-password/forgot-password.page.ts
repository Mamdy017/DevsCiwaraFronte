import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewPasswordPage } from '../new-password/new-password.page';
import { ConnexionService } from '../Services/connexion.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  modal: any;
  form: any = {

    email: null,
    
  };
  InscriptionReussi = false;
  Inscriptionechoue = false;
  messageErreur = '';
  constructor(private inscription:ConnexionService,private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cancel() {
    this.modal.dismiss();
  }
  onSubmit(): void {
    const {email } = this.form;

    this.inscription.forGotPassword(email).subscribe({
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
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: NewPasswordPage
    });
    return await modal.present();
  }
}
