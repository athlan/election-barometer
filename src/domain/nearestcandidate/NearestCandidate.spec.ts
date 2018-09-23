import { CandidateMatch, matchByCandidateId } from "./NearestCandidate";
import { CandidateId } from "../Candidate";

describe('NearestCandidate spec', () => {
    it('matchByCandidateId', () => {
        // given
        let matches = [
            CandidateMatch.of(CandidateId.of("Candidate 1"), 1.0),
            CandidateMatch.of(CandidateId.of("Candidate 2"), 1.0),
            CandidateMatch.of(CandidateId.of("Candidate 3"), 1.0),
        ]
        
        // when
        let found = matches.find(matchByCandidateId(CandidateId.of("Candidate 2")));

        // then
        expect(found.candidateId).not.toBeUndefined();
        expect(found.candidateId.equals(CandidateId.of("Candidate 2"))).toBeTruthy();
    });
});
