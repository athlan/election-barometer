import { NearestCandidateAlgo, CandidateMatch } from "../NearestCandidate";
import { CandidateQuestionare, answerForQuestion, answerAs } from "../../CandidateQuestionare";
import { UserAnswer } from "../../UserAnswer";
import { AlgoContext } from "./AlgoUtils";

export class WeightedAnswersAlgo implements NearestCandidateAlgo {

    match(candidateQuestionaries: CandidateQuestionare[], userAnswers: UserAnswer[]): CandidateMatch[] {
        let ctx: AlgoContext = new AlgoContext();
        ctx.registerCandidates(candidateQuestionaries);
        ctx.numberOfAnswers(userAnswers
            .filter(a => !a.isNullable)
            .length
        );

        userAnswers.forEach(userAnswer => {
            let theUsersAnswerId = userAnswer.answerId;
            let theUsersQuestionId = userAnswer.questionId;

            if(userAnswer.isNullable) {
                return;
            }

            candidateQuestionaries.forEach(q => {
                let candidateAnswer = q.answers
                    .filter(answerForQuestion(theUsersQuestionId))
                    .find(answerAs(theUsersAnswerId));
                
                if(candidateAnswer) {
                    ctx.modifyCandidatePoints(q.candidateId, candidateAnswer.answer);
                }
            })
        })

        return ctx.buildMatches();
    }    
}