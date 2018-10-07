import { GenericId } from "./Id";

export class Question {
    readonly id: QuestionId;
    readonly text: string;
    readonly description: string;
    readonly answers: Answer[];

    constructor(id: QuestionId,
        text: string,
        description: string,
        answers: Answer[]) {
        this.id = id;
        this.text = text;
        this.description = description;
        this.answers = answers;
    }
}

export class QuestionId extends GenericId<string> {

    public static of(value: string): QuestionId {
        return new QuestionId(value);
    }
}

export class Answer {
    readonly id: AnswerId;
    readonly text: string;
    readonly description: string;
    readonly isNullableAnswer: boolean;
    
    constructor(id: AnswerId,
        text: string,
        description: string,
        isNullableAnswer: boolean) {
        this.id = id;
        this.text = text;
        this.description = description;
        this.isNullableAnswer = isNullableAnswer;
    }
}

export class AnswerId extends GenericId<string> {

    public static of(value: string): AnswerId {
        return new AnswerId(value);
    }
}

export function questionById(questionId: QuestionId) {
    return (q: Question) => q.id.equals(questionId);
}
