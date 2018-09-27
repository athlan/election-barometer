import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { SurveyQuestionComponent } from './survey-question/survey-question.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';

const routes: Routes = [
  {
    path: ':surveyId',
    component: SurveyComponent,
    children: [
      {
        path: 'q/:questionId',
        component: SurveyQuestionComponent
      },
      {
        path: 'r',
        component: SurveyResultsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
