import { Question, QuestionId, AnswerId, Answer } from "src/domain/Question";
import { CandidateQuestionare, CandidateAnswer } from "src/domain/CandidateQuestionare";
import { CandidateId } from "src/domain/Candidate";

export function createQuestionareFor(candidateId: string, answers: CandidateAnswer[]): CandidateQuestionare {
    let theCandidateId = CandidateId.of(candidateId);

    return new CandidateQuestionare(theCandidateId, answers);
}

export function withCandidateAnswer(questionId: string, answerId: string, answer: number): CandidateAnswer {
    let theQuestionId = QuestionId.of(questionId);
    let theAnswerId = AnswerId.of(answerId);
    
    return new CandidateAnswer(theQuestionId, theAnswerId, answer);
}
