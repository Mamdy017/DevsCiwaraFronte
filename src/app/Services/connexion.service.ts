import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { AUTH_APIironment } from 'src/AUTH_APIironments/AUTH_APIironment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ConnexionService {
  AUTH_API = 'http://localhost:8080/devs/auth'
  constructor(private http: HttpClient) { }

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post(
     `${this.AUTH_API}/connexion`,
      {
        usernameOrEmail,
        password,
      },
      httpOptions
    );
  }

  inscription(nom: string, prenom: string, username:string,email:string, numero :any, password: string): Observable<any> {
    return this.http.post(`${this.AUTH_API}/inscription`,
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
    return this.http.put(`${this.AUTH_API}/utilisateur/modifier/${id}`,formData)
  }

  newPassword(nouveau:any):Observable<any> {
    return this.http.post(`${this.AUTH_API}/utilisateur/changePassword/`,nouveau);
  
  }

  
  changePassword(passwordData: any): Observable<any> {
    return this.http.post(`${this.AUTH_API}/utilisateur/changePassword`, passwordData);
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
     `${this.AUTH_API}/utilisateur/resetPassword/${email}`,
      {
       
        email,
       
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    const req = new HttpRequest('POST',`${this.AUTH_API}/`, {}, httpOptions);
    return this.http.request(req);
  }
}
