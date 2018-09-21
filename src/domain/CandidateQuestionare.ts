import { CandidateId } from "./Candidate";
import { QuestionId, AnswerId } from "./Question";

export class CandidateQuestionare {
    readonly candidateId: CandidateId;
    readonly answers: CandidateAnswer[];
}

export class CandidateAnswer {
    readonly questionId: QuestionId;
    readonly answerId: AnswerId;
    readonly answer: number;
}