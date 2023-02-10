import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjouterServiceService {

  constructor(private http: HttpClient) { }

  AjouterTeam(nom: string, creatorId: number, challengeId: number): Observable<any> {
    const body = { nom };
    return this.http.post(`http://localhost:8080/devs/auth/team/teams/${creatorId}/${challengeId}`, body);
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

  confirmer(teamId: number, iduser1: number, challengeId: number) {
    return this.http.put(`http://localhost:8080/devs/auth/teamusrs/${teamId}/${iduser1}/${challengeId}`, {});

  }
}