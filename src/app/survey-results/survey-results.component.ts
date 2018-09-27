import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Questionare } from '../../domain/Questionare';
import { Survey } from '../survey';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.scss']
})
export class SurveyResultsComponent implements OnInit {

  private survey: Survey;
  private questionare: Questionare;

  constructor(private surveyService: SurveyService) {}

  ngOnInit() {
    this.survey = this.surveyService.getSurvey();
    this.questionare = this.surveyService.getQuestionare();
  }

  get hasUnansweredQuestions(): boolean {
    return this.questionare.answeredQuestions.length < this.survey.questions.length;
  }

}
