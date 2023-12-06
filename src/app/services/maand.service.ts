import { Injectable } from '@angular/core';
import { Month } from '../months/month.model';

@Injectable({
  providedIn: 'root'
})
export class MaandService {
  maanden: Month[] = [
    new Month('September', 2023, 750),
    new Month('Oktober', 2023, 900)
  ];
  constructor() { }

  addMaand(maand: Month){
    this.maanden.push(maand);
  }
}
