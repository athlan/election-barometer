import { Question, QuestionId, AnswerId } from './Question';
import { CandidateQuestionare } from './CandidateQuestionare';
import { UserAnswer, answerForQuestion } from './UserAnswer';
import { NearestCandidateAlgo, CandidateMatch } from './nearestcandidate/NearestCandidate';

export class Questionare {
    private questions: Question[];
    private candidatesQuestionaries: CandidateQuestionare[];
    private userAnswers: UserAnswer[];

    public constructor(questions: Question[],
        candidatesQuestionaries: CandidateQuestionare[]) {
        this.questions = questions;
        this.candidatesQuestionaries = candidatesQuestionaries;
        this.userAnswers = [];
    }

    public reset() {
        this.userAnswers = [];
    }

    public userAnswer(userAnswer: UserAnswer) {
        if(!this.checkIfQuestionExists(userAnswer.questionId)) {
            throw "Given question does not exists.";
        }
        if(!this.checkIfAnswerExists(userAnswer.questionId, userAnswer.answerId)) {
            throw "Given answer does not exists.";
        }

        let selectedAnswer = this.questions
            .find(q => q.id.equals(userAnswer.questionId))
            .answers
            .find(a => a.id.equals(userAnswer.answerId));

        if(selectedAnswer.isNullableAnswer) {
            userAnswer.markAsNullable();
        }

        let foundAnswerIdx = this.userAnswers.findIndex(answerForQuestion(userAnswer.questionId));

        if(foundAnswerIdx != -1) {
            this.userAnswers[foundAnswerIdx] = userAnswer;
        }
        else {
            this.userAnswers.push(userAnswer);
        }
    }

    get answers(): UserAnswer[] {
        return Array.from(this.userAnswers.values());
    }

    get answeredQuestions(): QuestionId[] {
        return this.userAnswers
            .filter(a => !a.isNullable)
            .map(a => a.questionId);
    }

    get finished(): boolean {
        return this.userAnswers.length == this.questions.length;
    }

    public matchCandidates(algo: NearestCandidateAlgo): CandidateMatch[] {
        return algo.match(this.candidatesQuestionaries, Array.from(this.userAnswers.values()));
    }

    private checkIfQuestionExists(questionId: QuestionId) {
        return this.questions.find(q => q.id.equals(questionId)) !== undefined;
    }

    private checkIfAnswerExists(questionId: QuestionId, answerId: AnswerId) {
        return this.questions
            .find(q => q.id.equals(questionId))
            .answers
            .find(a => a.id.equals(answerId)) !== undefined
    }
}
