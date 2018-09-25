import { QuestionId, AnswerId } from "./Question";

export class UserAnswer {
    readonly questionId: QuestionId;
    readonly answerId: AnswerId;

    constructor(questionId: QuestionId,
        answerId: AnswerId) {
        this.questionId = questionId;
        this.answerId = answerId;
    }
}

export function answerForQuestion(questionId: QuestionId) {
    return (a: UserAnswer) => a.questionId.equals(questionId);
}
