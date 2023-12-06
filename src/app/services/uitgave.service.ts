import { Injectable } from '@angular/core';
import { Uitgave } from '../uitgave/uitgave.model';

@Injectable({
  providedIn: 'root'
})
export class UitgaveService {
  uitgaven: Uitgave[] = [];

  constructor() { }

  addUitgave(uitgave: Uitgave){
    this.uitgaven.push(uitgave);
  }
  
}

