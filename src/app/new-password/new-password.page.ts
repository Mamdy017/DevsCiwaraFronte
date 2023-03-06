import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../Services/connexion.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {
  modal: any;
  form: any = {
    emailOrNumero: null,
    currentpassword: null,
    newpassword: null,
    confirmpassword: null,
  };


  form2: any = {
    emailOrNumero: null,
    currentpassword: null,
    newpassword: null,
    confirmpassword: null,
  };

  InscriptionReussi = false;
  Inscriptionechoue = false;
  messageErreur = '';
  info: any;
  constructor(private inscription: ConnexionService,) { }

  ngOnInit() {
  }

  cancel() {
    this.modal.dismiss();
  }
  onSubmit(): void {
    this.form2.emailOrNumero = this.form.emailOrNumero;
    this.form2.currentpassword = this.form.currentpassword;
    this.form2.newPassword = this.form.newpassword;
    this.form2.confirmpassword = this.form.confirmpassword;
    this.inscription.newPassword(this.form2).subscribe(data => {
      this.info = data
    });
  }
}