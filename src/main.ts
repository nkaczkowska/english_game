import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';  // Import the routes
import { OnDestroy, OnInit } from '@angular/core';
import { AddQuestionsComponent } from './app/add-questions/add-questions.component';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Provide the routes for the app
    AddQuestionsComponent
  ]
}).catch(err => console.error(err));
