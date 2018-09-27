import { UserAnswer } from "../../domain/UserAnswer";

export interface UserAnswersRepository {

    saveUserAnswers(surveyId: string, data: UserAnswersSnapshot): Promise<boolean>;
    loadUserAnswers(surveyId: string) : Promise<UserAnswersSnapshot | null>;
}

export class UserAnswersSnapshot {

    constructor(readonly userAnswers: UserAnswer[]) {}
}
