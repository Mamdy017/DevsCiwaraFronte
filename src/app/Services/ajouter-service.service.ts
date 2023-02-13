import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjouterServiceService {

  constructor(private http: HttpClient) { }

  AjouterCommentaire(creatorId: number ,  questionId: number,description: string): Observable<any> {
    const body = { description };
    return this.http.post(`localhost:8080/devs/auth/commentaire/ajout/${creatorId}/${questionId}`, body);
  }


  AjouterTeam(nom: string, creatorId: number, challengeId: number): Observable<any> {
    const body = { nom };
    return this.http.post(`http://localhost:8080/devs/auth/commentaire/ajout/${creatorId}/${challengeId}`, body);
  }

  AjouterS(formData: FormData): Observable<any> {
    return this.http.post(`http://localhost:8080/devs/auth/solution/ajout/2/5/2`, formData);
  }




  ajouterSolution(idChallenge1: number, idTeam: number, iduser1: number, formData: FormData): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`http://localhost:8080/devs/auth/solution/ajout/${idChallenge1}/${idTeam}/${iduser1}`, formData);
  }

  addTeamUsersToTeamForChallenge(userIds: number[], id: number, challengeId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`http://localhost:8080/devs/auth/teamusrs/teams/${id}/${challengeId}?userIds=${userIds.join(',')}`, { headers });

  }

  // confirmer() {
  //   return this.http.put(`http://localhost:8080/devs/auth/teamusrs/${teamId}/${iduser1}/${challengeId}`,{});

  // }

  question(challengeId:number,userIds:number,question:string): Observable<any>{
    const body = { question };
    return this.http.post(`localhost:8080/devs/auth/question/ajout/${challengeId}/${userIds}`,body)
  }
  confirmer(teamId: number, iduser1: number, challengeId: number) {
    return this.http.put(`http://localhost:8080/devs/auth/teamusrs/${teamId}/${iduser1}/${challengeId}`, {});

  }
}
