import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  maand: string;
  jaar: string;
  amount: number;

  submit(maand: string, jaar: string, amount: number){
    this.maand = maand;
    this.jaar = jaar;
    this.amount = amount;
  }

}
