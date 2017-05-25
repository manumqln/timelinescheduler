import { EJAngular2Module } from 'ej-angular2';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { rootRouterConfig } from './app.routes';

import { ScheduleComponent } from './schedule/schedule.component';
import { Ng2DragDropModule } from "ng2-drag-drop";

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    Ng2DragDropModule,
    RouterModule.forRoot(rootRouterConfig),
    EJAngular2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
