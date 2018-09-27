import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Questionare } from '../../domain/Questionare';
import { Survey } from '../survey';
import { WeightedAnswersAlgo } from '../../domain/nearestcandidate/algo/WeightedAnswersAlgo';
import { CandidateMatch } from '../../domain/nearestcandidate/NearestCandidate';
import { sortCandidateMatchByResult } from '../../domain/nearestcandidate/algo/AlgoUtils';
import { CandidateId, Candidate, candidateById } from '../../domain/Candidate';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.scss']
})
export class SurveyResultsComponent implements OnInit {

  private survey: Survey;
  private questionare: Questionare;
  private hasUnansweredQuestionsIgnored: boolean = false;

  constructor(private surveyService: SurveyService) {}

  ngOnInit() {
    this.survey = this.surveyService.getSurvey();
    this.questionare = this.surveyService.getQuestionare();
  }

  get hasUnansweredQuestions(): boolean {
    return this.questionare.answeredQuestions.length < this.survey.questions.length;
  }

  get presentReport(): boolean {
    return this.hasUnansweredQuestionsIgnored || !this.hasUnansweredQuestions;
  }

  get matches() {
    let results = this.questionare.matchCandidates(new WeightedAnswersAlgo());
    results = results.sort(sortCandidateMatchByResult);

    return results.map((r: any) => {
      r.candidate = this.survey.candidates.find(candidateById(r.candidateId));
      return r;
    });
  }

  public doUnansweredQuestionsIgnore() {
    this.hasUnansweredQuestionsIgnored = true;
  }
}
