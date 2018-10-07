import { Question, QuestionId, AnswerId, Answer } from "src/domain/Question";

export function createQuestion(questionId: string, answers: Answer[]): Question {
    let id = QuestionId.of(questionId);
    let text = "Question " + questionId;
    let description = "Question description" + questionId;

    return new Question(id, text, description, answers);
}

export function withAnswer(answerId: string, isNullableAnswer: boolean = false): Answer {
    let id = AnswerId.of(answerId);
    let text = "Answer " + answerId;
    let description = "Answer description" + answerId;
    
    return new Answer(id, text, description, isNullableAnswer);
}
