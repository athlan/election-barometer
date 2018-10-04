import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyQuestionComponent } from './survey-question/survey-question.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';
import { AppMaterialDesignModule } from './app-material-design.module';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    SurveyQuestionComponent,
    SurveyResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    // material ui
    AppMaterialDesignModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
