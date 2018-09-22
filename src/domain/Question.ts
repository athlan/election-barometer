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
    
    constructor(id: AnswerId,
        text: string,
        description: string) {
        this.id = id;
        this.text = text;
        this.description = description;
    }
}

export class AnswerId extends GenericId<string> {

    public static of(value: string): AnswerId {
        return new AnswerId(value);
    }
}
