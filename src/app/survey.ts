import { Question } from "src/domain/Question"
import { Candidate } from "../domain/Candidate";
import { CandidateQuestionare } from "../domain/CandidateQuestionare";

export class Survey {

    public constructor(
        readonly id: string,
        readonly title: string,
        
        readonly properties: Map<string, object>,

        readonly questions: Question[],
        readonly candidates: Candidate[],
        readonly candidateQuestionare: CandidateQuestionare[]
    ) {}
}
