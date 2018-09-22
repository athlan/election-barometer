import { QuestionId, AnswerId } from "src/domain/Question";
import { UserAnswer } from "src/domain/UserAnswer";

export function userAnswer(questionId: string, answerId: string): UserAnswer {
    let theQuestionId = QuestionId.of(questionId);
    let theAnswerId = AnswerId.of(answerId);
    
    return new UserAnswer(theQuestionId, theAnswerId);
}