import { Injectable } from '@angular/core';
import { Survey } from './Survey';

import { data as fixtureQuestions } from "test/fixtures/dataset/QuestionsDataset";
import { data as fixtureCandidatesQuestionaries } from "test/fixtures/dataset/CandidateQuestionariesDataset";
import { Candidate, CandidateId } from '../domain/Candidate';

@Injectable({
  providedIn: 'root'
})
export class SurveyLoaderStaticFileService {

  public loadSurvey(surveyId: string): Promise<Survey> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let title = "title";

        let textIntroduction = "Lorem ipsum dolor sit amet.";
        let textCompletion = "completion";

        let questions = fixtureQuestions;
        let candidates = [
          new Candidate(CandidateId.of("Candidate 1"), "Candidate 1", "Candidate 1", "https://www.w3schools.com/howto/img_avatar.png"),
          new Candidate(CandidateId.of("Candidate 2"), "Candidate 2", "Candidate 2", "https://www.w3schools.com/howto/img_avatar.png"),
          new Candidate(CandidateId.of("Candidate 3"), "Candidate 3", "Candidate 3", "https://www.w3schools.com/howto/img_avatar.png"),
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

        resolve(survey);
      }, 500);
    });
  }
}
