import { userAnswer } from "test/fixtures/UserAnswerFactory"
import { data as fixtureCandidatesQuestionaries } from "test/fixtures/dataset/CandidateQuestionariesDataset";
import { NearestCandidateAlgo, matchByCandidateId } from "../NearestCandidate";
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

    it('when user not answers to all questions then missing responses are not considered to candidate match percentage', () => {
        // given
        let theCandidate1Id = CandidateId.of("Candidate 1");
        let theCandidate2Id = CandidateId.of("Candidate 2");
        let userAnswers = [
            userAnswer("Q1", "A1"),
            userAnswer("Q2", "A2"),
        ];
        let numberOfAnswers = 2;

        // when
        let matches = matchingAlgo.match(candidatesQuestionaries, userAnswers);
        let candidate1Match = matches.find(matchByCandidateId(theCandidate1Id));
        let candidate2Match = matches.find(matchByCandidateId(theCandidate2Id));

        // then
        expect(candidate1Match.match).toBe(1 / numberOfAnswers);
        expect(candidate2Match.match).toBe(1 / numberOfAnswers);

        expect(matches.length).toBe(candidatesQuestionaries.length);
    });

    it('when user answers to question that two cadidates answered the same then is same match as well', () => {
        // given
        let theCandidate2Id = CandidateId.of("Candidate 2");
        let theCandidate3Id = CandidateId.of("Candidate 3");
        let userAnswers = [
            userAnswer("Q3", "A3"),
        ];
        let numberOfAnswers = 1;

        // when
        let matches = matchingAlgo.match(candidatesQuestionaries, userAnswers);
        let candidate2Match = matches.find(matchByCandidateId(theCandidate2Id));
        let candidate3Match = matches.find(matchByCandidateId(theCandidate3Id));

        // then
        expect(candidate2Match.match).toBe(candidate3Match.match);

        expect(matches.length).toBe(candidatesQuestionaries.length);
    });

    it('when user answers to question that two cadidates answered with different score, matches are different accordingly', () => {
        // given
        let theCandidate1Id = CandidateId.of("Candidate 1");
        let theCandidate2Id = CandidateId.of("Candidate 2");
        let theCandidate3Id = CandidateId.of("Candidate 3");
        let userAnswers = [
            userAnswer("Q1", "A1"),
        ];
        let numberOfAnswers = 1;

        // when
        let matches = matchingAlgo.match(candidatesQuestionaries, userAnswers);
        let candidate1Match = matches.find(matchByCandidateId(theCandidate1Id));
        let candidate2Match = matches.find(matchByCandidateId(theCandidate2Id));
        let candidate3Match = matches.find(matchByCandidateId(theCandidate3Id));

        // then
        expect(candidate1Match.match).toBe(1 / numberOfAnswers);
        expect(candidate2Match.match).toBe(0);
        expect(candidate3Match.match).toBe(0.5 / numberOfAnswers);

        expect(matches.length).toBe(candidatesQuestionaries.length);
    });

    it('when user answers to all questions that candidates responded differently', () => {
        // given
        let theCandidate1Id = CandidateId.of("Candidate 1");
        let theCandidate2Id = CandidateId.of("Candidate 2");
        let theCandidate3Id = CandidateId.of("Candidate 3");
        let userAnswers = [
            userAnswer("Q1", "A1"),
            userAnswer("Q2", "A2"),
            userAnswer("Q3", "A3"),
        ];
        let numberOfAnswers = userAnswers.length;

        // when
        let matches = matchingAlgo.match(candidatesQuestionaries, userAnswers);
        let candidate1Match = matches.find(matchByCandidateId(theCandidate1Id));
        let candidate2Match = matches.find(matchByCandidateId(theCandidate2Id));
        let candidate3Match = matches.find(matchByCandidateId(theCandidate3Id));

        // then
        expect(candidate1Match.match).toBe(1 / numberOfAnswers); // Q1 (OK)
        expect(candidate2Match.match).toBe((1 + 1) / numberOfAnswers); // Q2 (OK), Q3 (OK)
        expect(candidate3Match.match).toBe((0.5 + 1 + 1) / numberOfAnswers); // Q1 (OK 50%), Q2 (OK), Q3 (OK)

        expect(matches.length).toBe(candidatesQuestionaries.length);
    });
});
