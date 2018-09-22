import { Questionare } from "./Questionare";
import { userAnswer } from "test/fixtures/UserAnswerFactory"
import { data as fixtureQuestions } from "test/fixtures/dataset/QuestionsDataset";
import { data as fixtureCandidatesQuestionaries } from "test/fixtures/dataset/CandidateQuestionariesDataset";

describe('Questionare usecase', () => {
    let questionare: Questionare;

    beforeEach(() => {
        questionare = new Questionare(fixtureQuestions, fixtureCandidatesQuestionaries);
    });

    it('questionare is created as unfinished', () => {
        expect(questionare.finished).toBeFalsy();
    });
    
    it('questionare is created with no answers', () => {
        expect(questionare.answeredQuestions.length).toBe(0);
    });
    
    it('user can answer the question', () => {
        // given
        let theAnswer = userAnswer("Q1", "A1");
        
        // when
        questionare.userAnswer(theAnswer);

        // then
        expect(questionare.answeredQuestions.length).toBe(1);
    });

    it('user can reset the questionare', () => {
        // given
        let theAnswer = userAnswer("Q1", "A1");
        
        // when
        questionare.userAnswer(theAnswer);
        questionare.reset();

        // then
        expect(questionare.answeredQuestions.length).toBe(0);
    });

    it('questionare is not finished when user not answered all questions', () => {
        // given
        let theAnswer = userAnswer("Q1", "A1");
        
        // when
        questionare.userAnswer(theAnswer);

        // then
        expect(questionare.finished).toBeFalsy();
    });

    it('questionare is finished when user answered all questions', () => {
        // given & when
        questionare.userAnswer(userAnswer("Q1", "A1"));
        questionare.userAnswer(userAnswer("Q2", "A1"));
        questionare.userAnswer(userAnswer("Q3", "A1"));

        // then
        expect(questionare.finished).toBeTruthy();
    });

    it('user cannot answer an inexisting question', () => {
        // given
        let theAnswer = userAnswer("An inexisting quetion QX", "A1");

        // when and then
        expect(() => questionare.userAnswer(theAnswer)).toThrow("Given question does not exists.");
    });

    it('user cannot answer an inexisting answer', () => {
        // given
        let theAnswer = userAnswer("Q1", "An inexisting answer AX");

        // when and then
        expect(() => questionare.userAnswer(theAnswer)).toThrow("Given answer does not exists.");
    });

    it('return ids of user answered question', () => {
        // given
        let theAnswer = userAnswer("Q1", "A1");
        
        // when
        questionare.userAnswer(theAnswer);

        // then
        expect(questionare.answeredQuestions.length).toBe(1);
        expect(questionare.answeredQuestions.map(id => id.value)).toContain("Q1");
    });
});
