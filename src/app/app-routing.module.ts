import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
  {
    path: ':surveyId',
    component: SurveyComponent,
    children: [
      {
        path: 'q/:questionId',
        component: QuestionComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
