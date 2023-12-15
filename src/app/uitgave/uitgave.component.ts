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

  id: number;
  datum: string;
  onderwerp: string;
  totaal: number;
  totale_uitgaven: number;

  uitgaven: Uitgave[]=[];
  uitgavenApi: Uitgave[];

  maanden: Month[] = this.maandService.maanden;
  maandenApi: Month[];
  
  inputTotaal: number;
  oldTotaal: number;
  totaalAlles: number = null;

  oTotaalAlles: number = 0;
  nTotaalAlles: number = 0;
  restTotaal: number = 0;

  isEditing = false;
  editedOnderwerp = '';
  editedTotaal: number;
  editingUitgave: Uitgave | undefined;

  totaalUitgaven: number;
  restUitgaven: number;  

  

 

  constructor(private route:ActivatedRoute,private fb:FormBuilder, private service:UitgaveService, private maandService:MaandService){}

  ngOnInit(): void {
    this.getMaandenApi();
    this.getUitgavenApi();

      this.maandString = this.route.snapshot.paramMap.get('month');
      const jaarNum = this.route.snapshot.paramMap.get('jaar');
      this.maandJaar = parseInt(jaarNum);
      const inkomenNum = this.route.snapshot.paramMap.get('inkomen');
      this.maandInkomen = parseInt(inkomenNum);
      // console.log(this.maandString);
      
      
      
      // this.registerUitgave.value.maandObject1 = this.maanden.find(maand => maand.maand == this.maandString);
      
      // this.uitgaven = this.service.uitgaven.filter(uitg => uitg.maand.maand === this.maandString && uitg.maand.jaar == this.maandJaar
      //                                              && uitg.maand.amount === this.maandInkomen); 

      
      
  }

  getMaandenApi(): void{
    this.maandService.getMaanden().subscribe(
      (response: Month[]) => {
        this.maandenApi = response;
        this.maandObject = response.find(maand => maand.maand == this.maandString && maand.jaar == this.maandJaar 
          && maand.amount == this.maandInkomen); 
          console.log(this.maandObject);
          this.getTotalAmount();
          this.getRest();
          
      }
    );
  }

  getUitgavenApi(): void{
    this.service.getUitgaven().subscribe(
      (response: Uitgave[]) => {
        this.uitgavenApi = response;
        this.uitgavenApi = response.filter(uitg => uitg.maand.maand === this.maandString && uitg.maand.jaar == this.maandJaar
          && uitg.maand.amount === this.maandInkomen); 
          console.log(this.uitgavenApi);
          
      }
    );
  }

  getTotalAmount(){
    this.service.getAmountUitgaven(this.maandObject.id).subscribe(
      (response) =>{
        console.log('Totaal is ', response);
        this.totaalUitgaven = response;
      }
    );
  }

  getRest(){
    this.service.getVerschilInkomenUitgaven(this.maandObject.id).subscribe(
      (response) => {
        console.log('Rest is ', response);
        this.restUitgaven = response;
      
      }
    )
  }
  

  //create uitgave maand met api
  createUitgaveMaandApi(){
    
    
    const newUitgave = new Uitgave(this.maandObject, this.onderwerp, this.datum, this.totaal);
    
    this.service.addNewUitgave(newUitgave).subscribe(      
      (response) => {
      console.log('Created successful', response);
      this.uitgavenApi.push(response);
      this.getTotalAmount();
      this.getRest();
      
      
      
  });
    this.datum = '';
    this.onderwerp = '';
    this.totaal = null;

  }
  

  startEditingOnderwerp(uitgave: Uitgave) {
    this.isEditing = true;
    this.editingUitgave = uitgave;
    this.editedOnderwerp = uitgave.onderwerp;
  }

  stopEditingOnderwerp(edtOnderwerp: string) {
    this.editingUitgave.onderwerp = edtOnderwerp;
    console.log(this.editingUitgave);

    this.service.updateUitgave(this.editingUitgave).subscribe(
      (response) => {
        console.log('Update successful', response);
        this.isEditing = false;
        this.editedOnderwerp = null;
        this.editingUitgave = null;
      }
    )
   }

   cancelEditingOnderwerp(){
    this.isEditing = false;
    this.editedOnderwerp = null;
    this.editingUitgave = null;
  }

  
  deleteUitgave(uitgaveId: number){
    
    const getId = uitgaveId;
    if(confirm('Are you sure you want to delete?'))
    this.service.deleteUitgave(getId).subscribe(
      (response) =>{
        console.log('successfully deleted');
        this.uitgaven.splice(getId);
        this.getUitgavenApi();
        this.getTotalAmount();
        this.getRest();
        
      }
    );

  }



  /*createUitgaveMaand(){
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
  }*/


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
