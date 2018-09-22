import { createQuestionareFor, withCandidateAnswer } from "../CandidateQuestionareFactory";

export const data = [
    createQuestionareFor("Candidate 1", [ 
        withCandidateAnswer("Q1", "A1", 1),
        withCandidateAnswer("Q2", "A1", 1),
        withCandidateAnswer("Q3", "A1", 1),
    ]),
    
    createQuestionareFor("Candidate 2", [ 
        withCandidateAnswer("Q1", "A2", 1),
        withCandidateAnswer("Q2", "A2", 1),
        withCandidateAnswer("Q3", "A3", 1),
    ]),
    
    createQuestionareFor("Candidate 3", [ 
        withCandidateAnswer("Q1", "A1", 0.5),
        withCandidateAnswer("Q1", "A2", 0.5),

        withCandidateAnswer("Q2", "A2", 1),
        withCandidateAnswer("Q3", "A3", 1),
    ]),
];
