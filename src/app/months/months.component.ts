import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Month } from './month.model';
import { MaandService } from '../services/maand.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrl: './months.component.css'
})
export class MonthsComponent implements OnInit{
  @Output() sendMaand = new EventEmitter<Month>();

  maand: string;
  jaar: number;
  inkomen: number;
  maanden: Month[] = this.maandService.maanden;
  maandenApi: Month[];

 

  registerMaand = this.fb.group({
    maand1: ['', Validators.required],
    jaar1: [null, Validators.required],
    inkomen1: [null, Validators.required]
  })

  constructor( private maandService:MaandService, private fb:FormBuilder){}

  ngOnInit(){
    this.getMaandenApi();
  }
  
  getMaandenApi(): void{
    this.maandService.getMaanden().subscribe(
      (response: Month[]) => {
        this.maandenApi = response;
      }
    );
  }

  onSubmitMonth1(){
    const newMonth = new Month(this.registerMaand.value.maand1, this.registerMaand.value.jaar1, this.registerMaand.value.inkomen1);
    this.maanden.push(newMonth);
    console.log(this.registerMaand.value);
    console.log(this.maanden);
    this.registerMaand.reset();
  }

//met api observable
  onSubmitMonth2(){
    const newMonth = new Month(this.registerMaand.value.maand1, this.registerMaand.value.jaar1, this.registerMaand.value.inkomen1);
    this.maandenApi.push(newMonth);
    this.maandService.addNewMaand(newMonth).subscribe();
    // console.log(this.registerMaand.value);
    console.log(this.maandenApi);
    this.registerMaand.reset();
  }

  getSelectedMaand(getMaand: Month){
    this.sendMaand.emit(getMaand);
  }

  /*onSubmitMonth(){
    const newMonth = new Month(this.maand, this.jaar, this.inkomen);
    this.maanden.push(newMonth);
    console.log(newMonth);
    console.log(this.maanden);
  }*/
}
