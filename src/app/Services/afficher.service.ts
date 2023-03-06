import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { this.AUTH_APIironment } from 'src/this.AUTH_APIironments/this.AUTH_APIironment';
//
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// const this.AUTH_API = 'http://localhost:8080/api/auth';



@Injectable({
  providedIn: 'root'
})
export class AfficherService {
  AUTH_API = 'http://localhost:8080/devs/auth'
  // AUTH_API = 'http://192.168.242.234'
µ // recupeId(id: number):Observable<any> {
  //   return  this.http.get(`${this.AUTH_API}/teamusrs/teamUserId/${id}`)
  // }

  recupeId(id: number): Observable<any> {
    return  this.http.get(`${this.AUTH_API}/teamusrs/teamUserId/${id}`)

  }
  constructor(private http: HttpClient ) { }
  afficherChallenge() :Observable<any>{
    return this.http.get(`${this.AUTH_API}/challenge/afficher`);
  }


  afficherChallengeEncours() :Observable<any>{
    return this.http.get(`${this.AUTH_API}/challenge/encours`);
  }

  afficherChallengeAvenir() :Observable<any>{
    return this.http.get(`${this.AUTH_API}/challenge/avenir`);
  }
  afficherChallengeTerminer() :Observable<any>{
    return this.http.get(`${this.AUTH_API}/challenge/terminer`);
  }

  afficherChallengeDecroissant() :Observable<any>{
    return this.http.get(`${this.AUTH_API}/challenge/decroissant`);
  }
  afficherCritereParIdChallenge(idChallenge:number) :Observable<any>{
    return this.http.get(`${this.AUTH_API}/challenge/criteria/${idChallenge}`)
  }
  afficherEquipeParUtilisateur(idChallenge: number, iduser1:number) :Observable<any>{
    return this.http.get(`${this.AUTH_API}/teamusrs/afficherEquipeParUtilisateur/${idChallenge}/${iduser1}`)
  }

  afficherUtilisateur() :Observable<any>{
    return this.http.get(`${this.AUTH_API}/teamusrs/afficher2`)
  }


  afficherEquipeMembre(idChallenge: number, idTeam:number) :Observable<any>{
    return this.http.get(`${this.AUTH_API}/teamusrs/afficherEquipeMembre/${idChallenge}/${idTeam}`)
  }

  afficherParIdChallenge(idChallenge:number) :Observable<any>{
    return this.http.get(`${this.AUTH_API}/challenge/afficher/${idChallenge}`)
  }

  classements(idChallenge:number) :Observable<any>{
    return this.http.get(`${this.AUTH_API}/solution/challenge/${idChallenge}`)
  }

  graphiqueUser() :Observable<any>{
    return this.http.get(`${this.AUTH_API}/utilisateur/afficheruser`)
  }

  VoirDemande(idusers:number) :Observable<any>{
    return this.http.get(`${this.AUTH_API}/teamusrs/user/${idusers}`)
  }
  Voirqquestion() :Observable<any>{
    return this.http.get(`${this.AUTH_API}/question/afficher`)
  }
  VoirquestionParChallenge(idChallenge:number) :Observable<any>{
    return this.http.get(`${this.AUTH_API}/question/afficher/${idChallenge}`)
  }
  VoirquestionParId(id:number) :Observable<any>{
    return this.http.get(`${this.AUTH_API}/question/afficherParId/${id}`)
  }

  VoirCommentaireParId(id:number) :Observable<any>{
    return this.http.get(`${this.AUTH_API}/commentaire/afficher/${id}`)
  }


}
