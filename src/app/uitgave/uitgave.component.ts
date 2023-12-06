import { Component, Input, OnInit } from '@angular/core';
import { Month } from '../months/month.model';
import { Uitgave } from './uitgave.model';
import { ActivatedRoute } from '@angular/router';
import { UitgaveService } from '../services/uitgave.service';
import { MaandService } from '../services/maand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-uitgave',
  templateUrl: './uitgave.component.html',
  styleUrl: './uitgave.component.css'
})
export class UitgaveComponent implements OnInit {
  maandString: string;
  maandJaar: number;
  maandInkomen: number;
  maandObject: Month = null;
  datum: string;
  onderwerp: string;
  totaal: number;
  uitgaven: Uitgave[]=[];
  maanden: Month[] = this.maandService.maanden;
  
  inputTotaal: number;
  oldTotaal: number;
  totaalAlles: number = null;

  oTotaalAlles: number = 0;
  nTotaalAlles: number = 0;
  restTotaal: number = 0;



 

  constructor(private route:ActivatedRoute,private fb:FormBuilder, private service:UitgaveService, private maandService:MaandService){

  }

  ngOnInit(): void {
      this.maandString = this.route.snapshot.paramMap.get('month');
      const jaarNum = this.route.snapshot.paramMap.get('jaar');
      this.maandJaar = parseInt(jaarNum);
      const inkomenNum = this.route.snapshot.paramMap.get('inkomen');
      this.maandInkomen = parseInt(inkomenNum);
      // console.log(this.maandString);
      this.maandObject = this.maanden.find(maand => maand.maand == this.maandString && maand.jaar == this.maandJaar 
                                          && maand.amount == this.maandInkomen); 
      
      // this.registerUitgave.value.maandObject1 = this.maanden.find(maand => maand.maand == this.maandString);
      console.log(this.maandObject);
      this.uitgaven = this.service.uitgaven.filter(uitg => uitg.maand.maand === this.maandString && uitg.maand.jaar == this.maandJaar
                                                   && uitg.maand.amount === this.maandInkomen); 
      console.log(this.uitgaven);
  }


  createUitgaveMaand(){
      const newUitgave = new Uitgave(this.maandObject, this.onderwerp, this.datum, this.totaal);
      this.service.addUitgave(newUitgave);
      this.uitgaven.push(newUitgave);
      // this.inputTotaal = this.storeOldTotaal(this.totaal);
    
      if (!isNaN(this.totaal)) {
        this.totaalAlles = (this.totaalAlles || 0) + this.totaal;
      }
  
    
    

    this.datum = '';
    this.onderwerp = '';
    this.totaal = null;
    
    
    // this.uitgaven.push(newUitgave);
    // console.log(this.service.uitgaven);
  }

  storeOldTotaal(inputUser: number){
    return this.oTotaalAlles + inputUser;
  }

  newTotaal(){
    return this.oTotaalAlles + this.nTotaalAlles;
  }

  berekenRest(){
    this.restTotaal = this.maandInkomen - this.totaalAlles;
  }

 




   // registerUitgave = this.fb.group({
  //   maandObject1: [this.maandObject, Validators.required],
  //   datum1: ['', Validators.required],
  //   onderwerp1: [null, Validators.required],
  //   totaal1: [null, Validators.required]
  // })

  // createUitgaveMaand1(){
  //   const newUitgave = new Uitgave(this.registerUitgave.value.maandObject1, this.registerUitgave.value.onderwerp1, this.registerUitgave.value.datum1, this.registerUitgave.value.totaal1);
  //   this.service.addUitgave(newUitgave);
  //   this.uitgaven.push(newUitgave);
  //   console.log(this.registerUitgave.value.maandObject1);
  //   console.log(this.service.uitgaven);
  // }
}
