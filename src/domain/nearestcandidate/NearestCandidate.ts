import { CandidateId } from "../Candidate";
import { CandidateQuestionare } from "../CandidateQuestionare";
import { UserAnswer } from "../UserAnswer";

export interface NearestCandidateAlgo {

    match(candidateQuestionaries: CandidateQuestionare[], userAnswers: UserAnswer[]): CandidateMatch[];
}

export class CandidateMatch {

    readonly candidateId: CandidateId;
    readonly match: number;

    private constructor(candidateId: CandidateId, match: number) {
        this.candidateId = candidateId;
        this.match = match;
    }

    public static of(candidateId: CandidateId, match: number): CandidateMatch {
        return new CandidateMatch(candidateId, match);
    }
}

export function matchByCandidateId(candidateId: CandidateId) {
    return (m: CandidateMatch) => m.candidateId.equals(candidateId);
}
