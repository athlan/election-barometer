import { data as fixtureCandidatesQuestionaries } from "test/fixtures/dataset/CandidateQuestionariesDataset";
import { matchByCandidateId } from "../NearestCandidate";
import { CandidateId } from "../../Candidate";
import { AlgoContext } from "./AlgoUtils";

describe('AlgoUtils spec', () => {
    const ANY_NUMBER_OF_ANSWERS = 3;

    let ctx: AlgoContext;

    beforeEach(() => {
        ctx = new AlgoContext();
    });

    it('number of answers cannot be not positive', () => {
        // given
        let invalidNumberOfAnswers = -1;

        // when & then
        expect(() => ctx.numberOfAnswers(invalidNumberOfAnswers)).toThrow("Cannot be less than 0.");
    });

    it('registered candidates have zero points in the results by default', () => {
        // given
        let questionaries = fixtureCandidatesQuestionaries;

        // when
        ctx.registerCandidates(questionaries);
        ctx.numberOfAnswers(ANY_NUMBER_OF_ANSWERS);
        // and no user answers

        let matches = ctx.buildMatches();

        // then
        expect(matches
            .find(matchByCandidateId(CandidateId.of("Candidate 1")))
            .match).toBe(0);
        expect(matches
            .find(matchByCandidateId(CandidateId.of("Candidate 2")))
            .match).toBe(0);
        expect(matches
            .find(matchByCandidateId(CandidateId.of("Candidate 3")))
            .match).toBe(0);
    });

    it('given points are divided by number of questions', () => {
        // given
        let questionaries = fixtureCandidatesQuestionaries;
        let theCandidate1 = CandidateId.of("Candidate 1");
        let theCandidate2 = CandidateId.of("Candidate 2");
        let theNotPointedCandidate = CandidateId.of("Candidate 3");

        // when
        ctx.registerCandidates(questionaries);

        ctx.modifyCandidatePoints(theCandidate1, 2.0);
        ctx.modifyCandidatePoints(theCandidate2, 3.0);

        ctx.numberOfAnswers(3);

        let matches = ctx.buildMatches();

        // then
        expect(matches
            .find(matchByCandidateId(theCandidate1))
            .match).toBe(2.0 / 3);
        expect(matches
            .find(matchByCandidateId(theCandidate2))
            .match).toBe(3.0 / 3);
        expect(matches
            .find(matchByCandidateId(theNotPointedCandidate))
            .match).toBe(0);
    });

    it('given points are summed when given multiple times', () => {
        // given
        let questionaries = fixtureCandidatesQuestionaries;
        let theCandidate = CandidateId.of("Candidate 1");

        // when
        ctx.registerCandidates(questionaries);

        ctx.modifyCandidatePoints(theCandidate, 1.0);
        ctx.modifyCandidatePoints(theCandidate, 2.0);

        ctx.numberOfAnswers(ANY_NUMBER_OF_ANSWERS);

        let matches = ctx.buildMatches();

        // then
        expect(matches
            .find(matchByCandidateId(theCandidate))
            .match).toBe((1.0 + 2.0) / ANY_NUMBER_OF_ANSWERS);
    });

    it('result is sorted having the greatest match first', () => {
        // given
        let questionaries = fixtureCandidatesQuestionaries;
        let theCandidate1 = CandidateId.of("Candidate 1");
        let theCandidate2 = CandidateId.of("Candidate 2");
        let theCandidate3 = CandidateId.of("Candidate 3");

        // when
        ctx.registerCandidates(questionaries);

        ctx.modifyCandidatePoints(theCandidate1, 2.0);
        ctx.modifyCandidatePoints(theCandidate2, 3.0);
        ctx.modifyCandidatePoints(theCandidate3, 0.5);

        ctx.numberOfAnswers(3);

        let matches = ctx.buildMatches();

        // then
        expect(matches[0].candidateId.equals(theCandidate2)).toBeTruthy();
        expect(matches[1].candidateId.equals(theCandidate1)).toBeTruthy();
        expect(matches[2].candidateId.equals(theCandidate3)).toBeTruthy();
    });
});
