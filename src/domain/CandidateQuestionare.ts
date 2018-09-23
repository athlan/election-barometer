import { CandidateId } from "./Candidate";
import { QuestionId, AnswerId } from "./Question";

export class CandidateQuestionare {
    readonly candidateId: CandidateId;
    readonly answers: CandidateAnswer[];

    constructor(candidateId: CandidateId,
        answers: CandidateAnswer[]) {
        this.candidateId = candidateId;
        this.answers = answers;
    }
}

export class CandidateAnswer {
    readonly questionId: QuestionId;
    readonly answerId: AnswerId;
    readonly answer: number;
    
    constructor(questionId: QuestionId,
        answerId: AnswerId,
        answer: number) {
        this.questionId = questionId;
        this.answerId = answerId;
        this.answer = answer;
    }
}

export function questionareByCandidate(candidateId: CandidateId) {
    return (q: CandidateQuestionare) => q.candidateId.equals(candidateId);
}

export function answerForQuestion(questionId: QuestionId) {
    return (a: CandidateAnswer) => a.questionId.equals(questionId);
}

export function answerAs(answerId: AnswerId) {
    return (a: CandidateAnswer) => a.answerId.equals(answerId);
}
