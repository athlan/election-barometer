import { Injectable } from '@angular/core';
import { Survey } from './Survey';

import { Questionare } from '../domain/Questionare';
import { UserAnswersSnapshot } from './user-answers/user-answers-repository.service';
import { LocalStorageRepository } from './user-answers/localstorage-repository.service';
import { SurveyLoaderStaticFileService } from './survey.loader.staticfile.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private survey: Survey;
  private questionare: Questionare;

  constructor(private surveyLoader: SurveyLoaderStaticFileService,
    private userAnswersRepository: LocalStorageRepository) {}

  public setSurveyContext(surveyId: string): Promise<Survey> {
    
    return new Promise((resolve, reject) => {
      this.surveyLoader.loadSurvey(surveyId)
        .then((survey) => {
          this.survey = survey;
          
          this.questionare = new Questionare(
            survey.questions,
            survey.candidateQuestionare
          );

          resolve(survey);
        })
        .catch((e) => {
          console.error(e);
          reject();
        });
    });
  }

  public getSurvey(): Survey {
    return this.survey;
  }

  public getQuestionare(): Questionare {
    return this.questionare;
  }

  public saveAnswers() {
    let snapshot = new UserAnswersSnapshot(this.questionare.answers);
    this.userAnswersRepository.saveUserAnswers(this.survey.id, snapshot);
  }

  public loadAnswers() {
    let that = this;
    this.userAnswersRepository.loadUserAnswers(this.survey.id)
      .then(function(snapshot) {
        if(snapshot) {
          snapshot.userAnswers.forEach(a => that.questionare.userAnswer(a));
        }
      });
  }
}
