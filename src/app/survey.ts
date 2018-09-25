import { Question } from "src/domain/Question"
import { Candidate } from "../domain/Candidate";
import { CandidateQuestionare } from "../domain/CandidateQuestionare";

export class Survey {

    public constructor(
        readonly id: string;
        readonly title: string,
        
        readonly textIntroduction: string,
        readonly textCompletion: string,

        readonly questions: Question[],
        readonly candidates: Candidate[],
        readonly candidateQuestionare: CandidateQuestionare[]
    ) {}
}
