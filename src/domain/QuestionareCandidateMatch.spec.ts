import { Questionare } from "./Questionare";
import { userAnswer } from "test/fixtures/UserAnswerFactory"
import { data as fixtureQuestions } from "test/fixtures/dataset/QuestionsDataset";
import { data as fixtureCandidatesQuestionaries } from "test/fixtures/dataset/CandidateQuestionariesDataset";
import { NearestCandidateAlgo, CandidateMatch } from "./nearestcandidate/NearestCandidate";
import { CandidateQuestionare } from "./CandidateQuestionare";
import { UserAnswer } from "./UserAnswer";

class StubAlgo implements NearestCandidateAlgo {
    candidateQuestionaries: CandidateQuestionare[];
    userAnswers: UserAnswer[];

    match(candidateQuestionaries: CandidateQuestionare[], userAnswers: UserAnswer[]): CandidateMatch[] {
        this.candidateQuestionaries = candidateQuestionaries;
        this.userAnswers = userAnswers;

        return [];
    }
}

describe('Questionare match candidate usecase', () => {
    let questionare: Questionare;
    let matchingAlgo: StubAlgo;

    beforeEach(() => {
        questionare = new Questionare(fixtureQuestions, fixtureCandidatesQuestionaries);
        matchingAlgo = new StubAlgo();
    });

    it('questionare passes candidates questionaries and user answers to algo', () => {
        // given
        let theAnswer = userAnswer("Q1", "A1");

        // when
        questionare.userAnswer(theAnswer);

        questionare.matchCandidates(matchingAlgo);

        // then
        expect(matchingAlgo.candidateQuestionaries).toBe(fixtureCandidatesQuestionaries);
        
        expect(matchingAlgo.userAnswers.length).toBe(1);
        expect(matchingAlgo.userAnswers[0].questionId.value).toBe("Q1");
        expect(matchingAlgo.userAnswers[0].answerId.value).toBe("A1");
    });
});
