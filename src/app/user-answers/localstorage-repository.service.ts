import { UserAnswer } from "../../domain/UserAnswer";
import { UserAnswersRepository, UserAnswersSnapshot } from "./user-answers-repository.service";
import { QuestionId, AnswerId } from "../../domain/Question";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageRepository implements UserAnswersRepository {

    storage: any = null;

    constructor(/*private storage: WindowLocalStorage*/) {}

    saveUserAnswers(surveyId: string, data: UserAnswersSnapshot): Promise<boolean> {
        let that = this;
        return new Promise(function(resolve, reject) {
            let payload = that.toJson(data);
            let key = "survey-" + surveyId;
    
            window.localStorage.setItem(key, payload);

            resolve(true);
        });
    }

    loadUserAnswers(surveyId: string) : Promise<UserAnswersSnapshot | null> {
        let that = this;
        return new Promise(function(resolve, reject) {
            let key = "survey-" + surveyId;

            let data = window.localStorage.getItem(key);

            if(null === data) {
                resolve(null);
            }
            else {
                resolve(that.fromJson(data));
            }
        });
    }

    private toJson(data: UserAnswersSnapshot): string {
        let result: any = {};

        result.userAnswers = data.userAnswers.map((a) => {
            return {
                questionId: a.questionId.value,
                answerId: a.answerId.value,
            }
        });

        return JSON.stringify(result);
    }

    private fromJson(data: string): UserAnswersSnapshot {
        let payload = JSON.parse(data);

        let userAnswers: UserAnswer[] = payload.userAnswers.map((a) => {
            return new UserAnswer(
                QuestionId.of(a.questionId),
                AnswerId.of(a.answerId)
            )
        });

        return new UserAnswersSnapshot(userAnswers);
    }
}
