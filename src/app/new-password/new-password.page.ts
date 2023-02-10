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
    emailOrNumero:null,
    currentpassword: null,
    newpassword: null,
    confirmpassword: null,
  };


  form2: any = {
    emailOrNumero:null,
    currentpassword: null,
    newpassword: null,
    confirmpassword: null,
  };

  InscriptionReussi = false;
  Inscriptionechoue = false;
  messageErreur = '';
  info: any;
  constructor(private inscription:ConnexionService,) { }

  ngOnInit() {
  }

  cancel() {
    this.modal.dismiss();
  }
  onSubmit(): void {
   // const { emailOrNumero,currentpassword,newpassword, confirmpassword } = this.form;
    // console.log(emailOrNumero)
    // console.log(currentpassword)
    // console.log(newpassword)
    // console.log(confirmpassword)

this.form2.emailOrNumero = this.form.emailOrNumero;
this.form2.currentpassword =  this.form.currentpassword;
this.form2.newPassword =  this.form.newpassword;
this.form2.confirmpassword =  this.form.confirmpassword;

console.log("   = recuperation==  "+this.form2)


this.inscription.newPassword(this.form2).subscribe(data=>{
  this.info = data

  console.log("=== info === "+this.info.message)
});

    // this.inscription.newPassword(emailOrNumero, currentpassword,newpassword, confirmpassword).subscribe({
    //   next: data => {
    //     console.log(data);
    //     this.InscriptionReussi = true;
    //     this.Inscriptionechoue = false;
    //   },
    //   error: err => {
    //     this.messageErreur = err.error.message;
    //     this.Inscriptionechoue = true;
    //   }
    // });
  }
}