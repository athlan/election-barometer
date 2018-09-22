import { GenericId } from "./Id";

export class Candidate {
    readonly id: CandidateId;
    readonly name: string;
    readonly description: string;
}

export class CandidateId extends GenericId<string> {

    public static of(value: string): CandidateId {
        return new CandidateId(value);
    }
}