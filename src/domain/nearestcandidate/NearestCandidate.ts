import { CandidateId } from "../Candidate";
import { CandidateQuestionare } from "../CandidateQuestionare";
import { UserAnswer } from "../UserAnswer";

export interface NearestCandidateAlgo {

    match(candidateQuestionaries: CandidateQuestionare[], userAnswers: UserAnswer[]): CandidateMatch[];
}

export class CandidateMatch {

    readonly candidateId: CandidateId;
    readonly match: number;
}
