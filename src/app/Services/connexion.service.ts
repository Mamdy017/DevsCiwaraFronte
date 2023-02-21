import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AUTH_APIironment } from 'src/AUTH_APIironments/AUTH_APIironment';
const AUTH_API = '';
// const AUTH_API = AUTH_APIironment.AUTH_API;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ConnexionService {
  constructor(private http: HttpClient) { }

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post(
     `http://localhost:8080/devs/auth/connexion`,
      {
        usernameOrEmail,
        password,
      },
      httpOptions
    );
  }

  inscription(nom: string, prenom: string, username:string,email:string, numero :any, password: string): Observable<any> {
    return this.http.post(`http://localhost:8080/devs/auth/inscription`,
      {
        nom,
        prenom,
        username,
        email,numero ,
        password,
      },
      httpOptions
    );
  }

  modifier(id:any, username: string, email: string, prenom:string,nom:string, numero: string, profile:File): Observable<any>{
    let formData =new FormData
    formData.append("username",username),
    formData.append("email",email),
    formData.append("prenom",prenom),
    formData.append("nom",nom),
    formData.append("numero",numero),
    formData.append("profile",profile)
    return this.http.put(`http://localhost:8080/devs/auth/utilisateur/modifier/${id}`,formData)
  }

  newPassword(nouveau:any):Observable<any> {
    return this.http.post(`http://localhost:8080/devs/auth/utilisateur/changePassword/`,nouveau);
  
  }

  
  changePassword(passwordData: any): Observable<any> {
    return this.http.post('http://localhost:8080/devs/auth/utilisateur/changePassword', passwordData);
  }

  // newPassword(emailOrNumero: string, currentpassword: string, newPassword:string,confirmpassword:string): Observable<any> {
  //   return this.http.post(
  //     AUTH_API + '/utilisateur/changePassword',
  //     {
  //       emailOrNumero,
  //       currentpassword,
  //       newPassword,
  //       confirmpassword
  //     },
  //     httpOptions
  //   );
  // }

  
  forGotPassword(email:string): Observable<any> {
    return this.http.post(
     `http://localhost:8080/devs/auth/utilisateur/resetPassword/${email}`,
      {
       
        email,
       
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    const req = new HttpRequest('POST',`http://localhost:8080/api/auth/`, {}, httpOptions);
    return this.http.request(req);
  }
}
