import { Injectable } from '@angular/core';
import { Survey } from './Survey';
import { map } from 'rxjs/operators';

import { Candidate, CandidateId } from '../domain/Candidate';
import { HttpClient } from '@angular/common/http';
import { Question, QuestionId, Answer, AnswerId } from '../domain/Question';
import { CandidateQuestionare, CandidateAnswer } from '../domain/CandidateQuestionare';

@Injectable({
  providedIn: 'root'
})
export class SurveyLoaderStaticFileService {

  constructor(private http: HttpClient) {
  }

  public loadSurvey(surveyId: string): Promise<Survey> {
    let basepath = "assets/data/" + surveyId + "/";
    let configFile = basepath + "details.json";

    return this.http.get(configFile)
      .pipe(map((data) => this.parseSurvey(surveyId, data)))
      .toPromise();
  }

  private parseSurvey(surveyId: string, data: any): Survey {
    return new Survey(
      surveyId,
      data.title,
      data.textIntroduction,
      data.textCompletion,
      data.questions.map(item => this.parseQuestion(item)),
      data.candidates.map(item => this.parseCandidate(item)),
      data.candidates.map(item => this.parseCandidateQuestionare(item)),
    );
  }

  private parseQuestion(data: any): Question {
    return new Question(
      QuestionId.of(data.id),
      data.text,
      data.description,
      data.answers.map(item => this.parseAnswer(item)),
    );
  }

  private parseAnswer(data: any): Answer {
    return new Answer(
      AnswerId.of(data.id),
      data.text,
      data.description,
    );
  }

  private parseCandidate(data: any): Candidate {
    return new Candidate(
      CandidateId.of(data.id),
      data.name,
      data.description,
      data.image,
    );
  }

  private parseCandidateQuestionare(data: any): CandidateQuestionare {
    return new CandidateQuestionare(
      CandidateId.of(data.id),
      data.answers.map(item => this.parseCandidateAnswer(item)),
    );
  }

  private parseCandidateAnswer(data: any): CandidateAnswer {
    return new CandidateAnswer(
      QuestionId.of(data.questionId),
      AnswerId.of(data.answerId),
      data.score,
    );
  }

}
