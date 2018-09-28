import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, questionById, QuestionId, AnswerId, Answer } from 'src/domain/Question';
import { SurveyService } from '../survey.service';
import { Survey } from '../survey';
import { Questionare } from '../../domain/Questionare';
import { UserAnswer, answerForQuestion } from '../../domain/UserAnswer';

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.scss'],
})
export class SurveyQuestionComponent implements OnInit {

  survey: Survey;
  question: Question;
  selectedAnswerId: AnswerId;
  questionare: Questionare;

  constructor(private route: ActivatedRoute,
    private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      let questionId = params.questionId
      this.doInit(questionId);
    });
  }

  public doInit(questionId: string) {
    this.survey = this.surveyService.getSurvey();
    
    let question = this.survey
      .questions
      .find(questionById(QuestionId.of(questionId)));

    this.question = question;
    this.questionare = this.surveyService.getQuestionare();
    this.selectedAnswerId = this.getSelectedAnswer(question);
  }

  private getSelectedAnswer(question: Question): AnswerId {
    let answer = this.questionare.answers
      .find(answerForQuestion(question.id));
    
    return (answer === undefined) ? null : answer.answerId;
  }

  public doAnswerPickup(answer: AnswerId) {
    this.selectedAnswerId = answer;
  }

  public doAnswer() {
    this.questionare.userAnswer(new UserAnswer(this.question.id, this.selectedAnswerId));
    this.surveyService.saveAnswers();
  }

  get nextQuestion(): Question {
    let data = this.survey.questions;
    let idx = data.indexOf(this.question);
    
    if(idx >= 0 && idx < data.length - 1) {
      return data[idx + 1];
    }
    
    return null;
  }

  get prevQuestion(): Question {
    let data = this.survey.questions;
    let idx = data.indexOf(this.question);
    
    if(idx > 0 && idx < data.length) {
      return data[idx - 1];
    }
    
    return null;
  }
}
