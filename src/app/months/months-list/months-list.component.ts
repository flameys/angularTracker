import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Month } from '../month.model';


@Component({
  selector: 'app-months-list',
  templateUrl: './months-list.component.html',
  styleUrl: './months-list.component.css'
})
export class MonthsListComponent {
  @Input() maandItem: Month;
  @Output() selectedMaand = new EventEmitter<void>();

  selectMaand(){
    this.selectedMaand.emit();
  }

  

}
