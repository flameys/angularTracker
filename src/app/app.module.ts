import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MonthsComponent } from './months/months.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonthsListComponent } from './months/months-list/months-list.component';
import { UitgaveComponent } from './uitgave/uitgave.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'uitgave/:month', component: UitgaveComponent },
  { path: 'uitgave/:month/:jaar', component: UitgaveComponent },
  { path: 'uitgave/:month/:jaar/:inkomen', component: UitgaveComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MonthsComponent,
    MonthsListComponent,
    UitgaveComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes), 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
