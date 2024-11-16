import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { CreateCatComponent } from './create-cat/create-cat.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { WritingComponent } from './questionTypes/writing/writing.component';
import { PickingComponent } from './questionTypes/picking/picking.component';
import { MatchingComponent } from './questionTypes/matching/matching.component';
import { OrderingComponent } from './questionTypes/ordering/ordering.component';
import { AddOrFinishComponent } from './add-or-finish/add-or-finish.component';


export const routes: Routes = [
  { path: 'main', component: AppComponent },  // default route
  { path: 'password-input', component: PasswordInputComponent },  // route for the password-input component
  { path: 'create-category', component: CreateCatComponent }, // route for the create-cat component
  { path: 'add-questions', component: AddQuestionsComponent }, //route for the add-questions component
  { path: 'add-writing-question', component: WritingComponent }, //route for the writing component
  { path: 'add-picking-question', component: PickingComponent }, //route for the writing component
  { path: 'add-matching-question', component: MatchingComponent }, //route for the writing component
  { path: 'add-ordering-question', component: OrderingComponent }, //route for the writing component
  { path: 'add-or-finish', component: AddOrFinishComponent }, //route for the add-or-finish 

];

