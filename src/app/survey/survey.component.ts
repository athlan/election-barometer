import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../survey.service';
import { Survey } from '../survey';
import { Questionare } from '../../domain/Questionare';
import { QuestionId } from '../../domain/Question';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  survey: Survey;
  questionare: Questionare;
  isQuetionOpened: boolean;

  constructor(private route: ActivatedRoute,
    private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.route.url.subscribe( urlSegment => {
      this.isQuetionOpened = this.route.firstChild !== null;
    });

    this.route.params.subscribe( params => {
      let surveyId = params.surveyId
      this.doInit(surveyId);
    });
  }

  public doInit(surveyId: string) {
    this.surveyService.setSurveyContext(surveyId)
      .then((survey) => {
        this.survey = survey;
        this.questionare = this.surveyService.getQuestionare();
        this.surveyService.loadAnswers();
      })
  }

  public isQuestionAnswered(quetionId: QuestionId): boolean {
    return this.questionare.answeredQuestions.find(id => id.equals(quetionId)) !== undefined;
  }

  get isIntro(): boolean {
    return !this.isQuetionOpened;
  }
}
