import { Injectable } from '@angular/core';
import { Month } from '../months/month.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaandService {
  private apiServerUrl = environment.apiBaseUrl;
   
  maanden: Month[] = [
    new Month('September', 2023, 750),
    new Month('Oktober', 2023, 900)
  ];
  constructor(private http: HttpClient) { }

  addMaand(maand: Month){
    this.maanden.push(maand);
  }

  //angular endpoints methods

  public getMaanden(): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/maanden/all`);
  }

  public addNewMaand(maand: Month): Observable<Month>{
    return this.http.post<Month>(`${this.apiServerUrl}/maanden/addMaand`, maand);
  }

}
