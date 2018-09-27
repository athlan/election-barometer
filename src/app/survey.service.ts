import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Survey } from './Survey';

import { data as fixtureQuestions } from "test/fixtures/dataset/QuestionsDataset";
import { data as fixtureCandidatesQuestionaries } from "test/fixtures/dataset/CandidateQuestionariesDataset";
import { Questionare } from '../domain/Questionare';
import { UserAnswersSnapshot } from './user-answers/user-answers-repository.service';
import { LocalStorageRepository } from './user-answers/localstorage-repository.service';
import { Candidate, CandidateId } from '../domain/Candidate';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private survey: Survey;
  private questionare: Questionare;

  constructor(private userAnswersRepository: LocalStorageRepository) {}

  public setSurveyContext(surveyId: string): Promise<Survey> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let title = "title";

        let textIntroduction = "intro";
        let textCompletion = "completion";

        let questions = fixtureQuestions;
        let candidates = [
          new Candidate(CandidateId.of("Candidate 1"), "Candidate 1", "Candidate 1"),
          new Candidate(CandidateId.of("Candidate 2"), "Candidate 2", "Candidate 2"),
          new Candidate(CandidateId.of("Candidate 3"), "Candidate 3", "Candidate 3"),
        ];
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
