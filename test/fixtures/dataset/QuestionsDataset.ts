import { createQuestion, withAnswer } from "../QuestionFactory";

export const data = [
    createQuestion("Q1", [ withAnswer("A1"), withAnswer("A2"), withAnswer("A3") ]),
    createQuestion("Q2", [ withAnswer("A1"), withAnswer("A2"), withAnswer("A3") ]),
    createQuestion("Q3", [ withAnswer("A1"), withAnswer("A2"), withAnswer("A3") ]),
];