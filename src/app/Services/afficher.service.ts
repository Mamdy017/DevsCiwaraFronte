import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { AUTH_APIironment } from 'src/AUTH_APIironments/AUTH_APIironment';
//
import { map, switchMap } from 'rxjs/operators';
const AUTH_API = 'http://localhost:8080/api/auth';

// const AUTH_API = AUTH_APIironment.AUTH_API;

@Injectable({
  providedIn: 'root'
})
export class AfficherService {
  // recupeId(id: number):Observable<any> {
  //   return  this.http.get(`http://localhost:8080/devs/auth/teamusrs/teamUserId/${id}`)
  // }

  recupeId(id: number): Observable<any> {
    return  this.http.get(`http://localhost:8080/devs/auth/teamusrs/teamUserId/${id}`)

  }
  constructor(private http: HttpClient ) { }
  afficherChallenge() :Observable<any>{
    return this.http.get(`${AUTH_API}/challenge/afficher`);
  }


  afficherChallengeEncours() :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/challenge/encours`);
  }

  afficherChallengeAvenir() :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/challenge/avenir`);
  }
  afficherChallengeTerminer() :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/challenge/terminer`);
  }

  afficherChallengeDecroissant() :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/challenge/decroissant`);
  }
  afficherCritereParIdChallenge(idChallenge:number) :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/challenge/criteria/${idChallenge}`)
  }
  afficherEquipeParUtilisateur(idChallenge: number, iduser1:number) :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/teamusrs/afficherEquipeParUtilisateur/${idChallenge}/${iduser1}`)
  }

  afficherUtilisateur() :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/teamusrs/afficher2`)
  }


  afficherEquipeMembre(idChallenge: number, idTeam:number) :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/teamusrs/afficherEquipeMembre/${idChallenge}/${idTeam}`)
  }

  afficherParIdChallenge(idChallenge:number) :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/challenge/afficher/${idChallenge}`)
  }

  classements(idChallenge:number) :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/solution/challenge/${idChallenge}`)
  }

  graphiqueUser() :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/utilisateur/afficheruser`)
  }

  VoirDemande(idusers:number) :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/teamusrs/user/${idusers}`)
  }
  Voirqquestion() :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/question/afficher`)
  }
  VoirquestionParChallenge(idChallenge:number) :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/question/afficher/${idChallenge}`)
  }
  VoirquestionParId(id:number) :Observable<any>{
    return this.http.get(`http://localhost:8080/devs/auth/question/afficherParId/${id}`)
  }




}
