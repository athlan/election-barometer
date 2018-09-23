import { CandidateId } from "../../Candidate";
import { CandidateQuestionare } from "../../CandidateQuestionare";
import { CandidateMatch } from "../NearestCandidate";

export class AlgoContext {

    readonly result: Map<string, number>;
    private _numberOfAnswers: number;

    constructor() {
        this.result = new Map;
    }

    public numberOfAnswers(numberOfAnswers: number): void {
        if (numberOfAnswers < 1) {
            throw "Cannot be less than 0.";
        }
        this._numberOfAnswers = numberOfAnswers;
    }

    public registerCandidates(candidateQuestionaries: CandidateQuestionare[]): void {
        // Initialize empty results
        for (let candidateQuestionare of candidateQuestionaries) {
            this.result.set(candidateQuestionare.candidateId.value, 0.0);
        }
    }

    public modifyCandidatePoints(candidateId: CandidateId, delta: number): void {
        let curr = this.result.get(candidateId.value);

        if (curr === undefined) {
            curr = 0.0;
        }

        let next = curr + delta;
        this.result.set(candidateId.value, next);
    }

    public buildMatches(): CandidateMatch[] {
        let result: CandidateMatch[] = [];
        let n = this._numberOfAnswers;

        this.result.forEach((v, k) => {
            let val = (n == 0) ? 0 : v / n;
            result.push(CandidateMatch.of(CandidateId.of(k), val));
        });

        result = result.sort((a, b) => {
            return b.match - a.match;
        });

        return result;
    }
}

export const sortCandidateMatchByResult = function (a, b: CandidateMatch) {
    return b.match - a.match;
}
