import { CandidateQuestionare } from "./CandidateQuestionare";
import { Questionare } from "./Questionare";
import { QuestionId, AnswerId, Question } from "./Question";
import { UserAnswer } from "./UserAnswer";

describe('Questionare usecase', () => {
    let questionare: Questionare;

    beforeEach(() => {
        let questions = [new Question(new QuestionId("Q1"))];
        let candidatesQuestionaries = [new CandidateQuestionare()];
        questionare = new Questionare(questions, candidatesQuestionaries);
    });

    it('questionare is created as unfinished', () => {
        expect(questionare.finished).toBe(false);
    });
    
    it('questionare is created with no answers', () => {
        expect(questionare.answeredQuestions.length).toBe(0);
    });
    
    it('user can answer the question', () => {
        let q1 = new QuestionId("Q1");
        let a1 = new AnswerId("A1");
        questionare.userAnswer(new UserAnswer(q1, a1));

        expect(questionare.answeredQuestions).toContain(q1);
    });

    it('user cannot answer an inexisting question', () => {
        let q1 = new QuestionId("Inexisting Q1");
        let a1 = new AnswerId("A1");

        expect(() => questionare.userAnswer(new UserAnswer(q1, a1))).toThrow("Given question does not exists.");
    });
});
