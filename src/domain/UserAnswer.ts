import { QuestionId, AnswerId } from "./Question";

export class UserAnswer {
    private _nullable: boolean;

    constructor(readonly questionId: QuestionId,
        readonly answerId: AnswerId) {
        this._nullable = false;
    }

    public markAsNullable() {
        this._nullable = true;
    }

    get isNullable() {
        return this._nullable;
    }
}

export function answerForQuestion(questionId: QuestionId) {
    return (a: UserAnswer) => a.questionId.equals(questionId);
}
