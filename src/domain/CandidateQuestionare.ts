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