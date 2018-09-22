import { Question, QuestionId, AnswerId } from './Question';
import { CandidateQuestionare } from './CandidateQuestionare';
import { UserAnswer } from './UserAnswer';
import { NearestCandidateAlgo, CandidateMatch } from './nearestcandidate/NearestCandidate';

export class Questionare {
    private questions: Question[];
    private candidatesQuestionaries: CandidateQuestionare[];
    private userAnswers: Map<QuestionId, UserAnswer>;

    public constructor(questions: Question[],
        candidatesQuestionaries: CandidateQuestionare[]) {
        this.questions = questions;
        this.candidatesQuestionaries = candidatesQuestionaries;
        this.userAnswers = new Map;
    }

    public reset() {
        this.userAnswers.clear();
    }

    public userAnswer(userAnswer: UserAnswer) {
        if(!this.checkIfQuestionExists(userAnswer.questionId)) {
            throw "Given question does not exists.";
        }
        if(!this.checkIfAnswerExists(userAnswer.questionId, userAnswer.answerId)) {
            throw "Given answer does not exists.";
        }

        this.userAnswers.set(userAnswer.questionId, userAnswer);
    }

    get answeredQuestions(): QuestionId[] {
        return Array.from(this.userAnswers.keys());
    }

    get finished(): boolean {
        return this.userAnswers.size == this.questions.length;
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
