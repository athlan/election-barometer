import { GenericId } from "./Id";

export class Question {
    readonly id: QuestionId;
    readonly text: string;
    readonly description: string;
    readonly answers: Answer[];

    constructor(id: QuestionId,
        text: string,
        description: string) {
        this.id = id;
        this.text = text;
        this.description = description;
    }
}

export class QuestionId extends GenericId<string> {
}

export class Answer {
    readonly id: AnswerId;
    readonly text: string;
    readonly description: string;
}

export class AnswerId extends GenericId<string> {
}
