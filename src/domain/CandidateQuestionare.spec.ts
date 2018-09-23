import { CandidateQuestionare, CandidateAnswer, questionareByCandidate, answerForQuestion, answerAs } from "./CandidateQuestionare";
import { QuestionId, AnswerId } from "./Question";
import { CandidateId } from "./Candidate";

describe('CandidateQuestionare spec', () => {

    const ANY_RESULT = 1.0;
    const ANY_ANSWERS = [];
    
    it('answerForQuestion', () => {
        // given
        let answers = [
            new CandidateQuestionare(CandidateId.of("Candidate 1"), ANY_ANSWERS),
            new CandidateQuestionare(CandidateId.of("Candidate 2"), ANY_ANSWERS),
            new CandidateQuestionare(CandidateId.of("Candidate 3"), ANY_ANSWERS),
        ]
        
        // when
        let found = answers.find(questionareByCandidate(CandidateId.of("Candidate 2")));

        // then
        expect(found).not.toBeUndefined();
        expect(found.candidateId.equals(CandidateId.of("Candidate 2"))).toBeTruthy();
    });

    it('answerForQuestion', () => {
        // given
        let answers = [
            new CandidateAnswer(QuestionId.of("Q1"), AnswerId.of("A1"), ANY_RESULT),
            new CandidateAnswer(QuestionId.of("Q2"), AnswerId.of("A2"), ANY_RESULT),
            new CandidateAnswer(QuestionId.of("Q3"), AnswerId.of("A2"), ANY_RESULT),
        ]
        
        // when
        let found = answers.find(answerForQuestion(QuestionId.of("Q2")));

        // then
        expect(found).not.toBeUndefined();
        expect(found.questionId.equals(QuestionId.of("Q2"))).toBeTruthy();
    });
    
    it('answerForQuestion', () => {
        // given
        let answers = [
            new CandidateAnswer(QuestionId.of("Q1"), AnswerId.of("A1"), ANY_RESULT),
            new CandidateAnswer(QuestionId.of("Q2"), AnswerId.of("A2"), ANY_RESULT),
            new CandidateAnswer(QuestionId.of("Q3"), AnswerId.of("A2"), ANY_RESULT),
        ]
        
        // when
        let found = answers.filter(answerAs(QuestionId.of("A2")));

        // then
        expect(found.length).toBe(2);
        expect(found[0].questionId.equals(QuestionId.of("Q2"))).toBeTruthy();
        expect(found[1].questionId.equals(QuestionId.of("Q3"))).toBeTruthy();
    });
});
