import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AjouterServiceService {
  AUTH_API = 'http://localhost:8080/devs/auth'
  constructor(private http: HttpClient) { }

  AjouterCommentaire(creatorId: number ,  questionId: number,description: string): Observable<any> {
    const body = { description };
    return this.http.post(`${this.AUTH_API}/commentaire/ajout/${creatorId}/${questionId}`, body);
  }


  AjouterTeam(nom: string,creatorId: number, challengeId: number): Observable<any> {
    const body = { nom };
    return this.http.post(`${this.AUTH_API}/team/teams/${creatorId}/${challengeId}`, body);
  }

  dislike(questionid: any,): Observable<any> {
    let data = new FormData()
    data.append("questionid",questionid)
    return this.http.post(`${this.AUTH_API}/commentaire/incrementType2/`,data);
  }

  like(questionid: any,): Observable<any> {
    let data = new FormData()
    data.append("questionid",questionid)
    return this.http.post(`${this.AUTH_API}/commentaire/incrementType1/`, data);
  }



  ajouterSolution(idChallenge1: number, idTeam: number, iduser1: number, formData: FormData): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.AUTH_API}/solution/ajout/${idChallenge1}/${idTeam}/${iduser1}`, formData);
  }
  ajouterSolutionUsers(idChallenge1: number, iduser1: number, formData: FormData): Observable<any> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.AUTH_API}/solution/ajout2/${idChallenge1}/${iduser1}`, formData);
  }

  addTeamUsersToTeamForChallenge(userIds: number[], id: number, challengeId: number):Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.AUTH_API}/teamusrs/teams/${id}/${challengeId}?userIds=${userIds.join(',')}`, { headers });

  }

  // confirmer() {
  //   return this.http.put(`${this.AUTH_API}/teamusrs/${teamId}/${iduser1}/${challengeId}`,{});

  // }

  question(challengeId:number,userIds:number,question:string): Observable<any>{
    const body = { question };
    return this.http.post(`${this.AUTH_API}/question/ajout/${challengeId}/${userIds}`,body)
  }
  confirmer(teamId: number, iduser1: number, challengeId: number) {
    return this.http.put(`${this.AUTH_API}/teamusrs/${teamId}/${iduser1}/${challengeId}`, {});

  }
}
