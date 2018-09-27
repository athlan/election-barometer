import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyQuestionComponent } from './survey-question/survey-question.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    SurveyQuestionComponent,
    SurveyResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
