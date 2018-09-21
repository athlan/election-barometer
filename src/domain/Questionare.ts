import { Question, QuestionId, AnswerId } from './Question';
import { CandidateQuestionare } from './CandidateQuestionare';
import { UserAnswer } from './UserAnswer';

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

        this.userAnswers.set(userAnswer.questionId, userAnswer);
    }

    get answeredQuestions(): QuestionId[] {
        return Array.from(this.userAnswers.keys());
    }

    get finished(): boolean {
        return this.userAnswers.size == this.questions.length;
    }

    private checkIfQuestionExists(questionId: QuestionId) {
        return this.questions.filter(q => q.id.equals(questionId)).length > 0;
    }
}
