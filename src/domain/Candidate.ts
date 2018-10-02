import { GenericId } from "./Id";

export class Candidate {
    
    constructor(readonly id: CandidateId,
        readonly name: string,
        readonly description: string,
        readonly image: string) {}
}

export class CandidateId extends GenericId<string> {

    public static of(value: string): CandidateId {
        return new CandidateId(value);
    }
}

export function candidateById(candidateId: CandidateId) {
    return (q: Candidate) => q.id.equals(candidateId);
}
