import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Questionare } from '../../domain/Questionare';
import { Survey } from '../survey';
import { WeightedAnswersAlgo } from '../../domain/nearestcandidate/algo/WeightedAnswersAlgo';
import { sortCandidateMatchByResult } from '../../domain/nearestcandidate/algo/AlgoUtils';
import { answerForQuestion } from '../../domain/UserAnswer';
import { answerForQuestion as candidateAnswerForQuestion, answerAs } from '../../domain/CandidateQuestionare';
import { CandidateMatch } from '../../domain/nearestcandidate/NearestCandidate';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.scss']
})
export class SurveyResultsComponent implements OnInit {

  private survey: Survey;
  private questionare: Questionare;
  private hasUnansweredQuestionsIgnored: boolean = false;
  private matches: CandidateMatch[];
  private matchesMaxScore: number;

  constructor(private surveyService: SurveyService) {}

  ngOnInit() {
    this.survey = this.surveyService.getSurvey();
    this.questionare = this.surveyService.getQuestionare();

    let matches = this.questionare.matchCandidates(new WeightedAnswersAlgo());
    this.matches = matches.sort(sortCandidateMatchByResult);
    this.matchesMaxScore = Math.max(... matches.map(m => m.match));
  }

  get hasUnansweredQuestions(): boolean {
    return this.questionare.answeredQuestions.length < this.survey.questions.length;
  }

  get presentReport(): boolean {
    return this.hasUnansweredQuestionsIgnored || !this.hasUnansweredQuestions;
  }

  get candidatesById() {
    let results = {};

    this.survey.candidates.forEach(c => {
      results[c.id.value] = c;
    });
    
    return results;
  }

  get answersSummary() {
    let questions = this.survey.questions;

    return questions.map(question => {
      let userAnswer = this.questionare.answers.find(answerForQuestion(question.id));
      let userAnswered = userAnswer !== undefined;
      
      let answers = question.answers.map(answer => {
        let candidatesAnswers = [];

        this.survey.candidateQuestionare.forEach(questionare => {
          let candidateAnswer = questionare.answers
            .filter(candidateAnswerForQuestion(question.id))
            .find(answerAs(answer.id));

          if(candidateAnswer) {
            candidatesAnswers.push({
              candidateId: questionare.candidateId,
              answer: candidateAnswer
            });
          }
        })
        
        return {
          answer: answer,
          userAnswer: (userAnswered) ? userAnswer.answerId.equals(answer.id) : false,
          candidatesAnswers: candidatesAnswers,
        }
      })

      return {
        question: question,
        answers: answers,
        userAnswered: userAnswered
      };
    });
  }

  public doUnansweredQuestionsIgnore() {
    this.hasUnansweredQuestionsIgnored = true;
  }

  public doRestart() {
    this.surveyService.getQuestionare().reset();
    this.surveyService.saveAnswers();
  }
}
