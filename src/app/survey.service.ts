import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Survey } from './Survey';

import { data as fixtureQuestions } from "test/fixtures/dataset/QuestionsDataset";
import { data as fixtureCandidatesQuestionaries } from "test/fixtures/dataset/CandidateQuestionariesDataset";
import { Questionare } from '../domain/Questionare';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private survey: Survey;
  private questionare: Questionare;

  constructor() {}

  public setSurveyContext(surveyId: string): Promise<Survey> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let title = "title";

        let textIntroduction = "intro";
        let textCompletion = "completion";

        let questions = fixtureQuestions;
        let candidates = [];
        let candidateQuestionare = fixtureCandidatesQuestionaries;

        console.log("Loading remote data... %s", surveyId)

        let survey = new Survey(
          surveyId,
          title,
          textIntroduction,
          textCompletion,
          questions,
          candidates,
          candidateQuestionare
        );

        this.survey = survey;
        
        this.questionare = new Questionare(
          survey.questions,
          survey.candidateQuestionare
        );

        resolve(survey);
      }, 500);
    });
  }

  public getSurvey(): Survey {
    return this.survey;
  }

  public getQuestionare(): Questionare {
    return this.questionare;
  }
}
