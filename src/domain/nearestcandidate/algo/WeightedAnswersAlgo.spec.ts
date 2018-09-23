import { userAnswer } from "test/fixtures/UserAnswerFactory"
import { data as fixtureCandidatesQuestionaries } from "test/fixtures/dataset/CandidateQuestionariesDataset";
import { NearestCandidateAlgo, CandidateMatch, matchByCandidateId } from "../NearestCandidate";
import { WeightedAnswersAlgo } from "./WeightedAnswersAlgo";
import { CandidateQuestionare } from "../../CandidateQuestionare";
import { CandidateId } from "../../Candidate";

describe('WeightedAnswersAlgo spec', () => {
    let matchingAlgo: NearestCandidateAlgo;
    let candidatesQuestionaries: CandidateQuestionare[];

    beforeEach(() => {
        matchingAlgo = new WeightedAnswersAlgo();
        candidatesQuestionaries = fixtureCandidatesQuestionaries;
    });

    it('when user answers exactly the same as candidate then match is 100% and is first', () => {
        // given
        let theCandidate1Id = CandidateId.of("Candidate 1");
        let userAnswers = [
            userAnswer("Q1", "A1"),
            userAnswer("Q2", "A1"),
            userAnswer("Q3", "A1"),
        ];

        // when
        let matches = matchingAlgo.match(candidatesQuestionaries, userAnswers);
        let candidate1Match = matches.find(matchByCandidateId(theCandidate1Id));

        // then
        expect(candidate1Match.candidateId.equals(theCandidate1Id)).toBeTruthy();
        expect(candidate1Match.match).toBe(1);

        expect(matches.length).toBe(candidatesQuestionaries.length);
    });
});
