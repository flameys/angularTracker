import { Injectable } from '@angular/core';
import { Uitgave } from '../uitgave/uitgave.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Month } from '../months/month.model';

@Injectable({
  providedIn: 'root'
})
export class UitgaveService {
  uitgaven: Uitgave[] = [];
  

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  addUitgave(uitgave: Uitgave){
    this.uitgaven.push(uitgave);
  }

  //API's

  public searchUitgave(uitgaveId: number): Observable<Uitgave>{
    return this.http.get<Uitgave>(`${this.apiServerUrl}/${uitgaveId}`);
  }

  public getUitgaven(): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/uitgaven/all`);
  }

  public getAmountUitgaven(maandId: number): Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/uitgaven/totaalAlles/${maandId}`);

  }

  public addNewUitgave(uitgave: Uitgave): Observable<Uitgave>{
    return this.http.post<Uitgave>(`${this.apiServerUrl}/uitgaven/addUitgave`, uitgave);
  }

  public updateUitgave(uitgave: Uitgave): Observable<Uitgave>{
    return this.http.put<Uitgave>(`${this.apiServerUrl}/uitgaven/update`, uitgave);
  }

  public deleteUitgave(uitgaveId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/uitgaven/delete/${uitgaveId}`);
  }

  
  
}

