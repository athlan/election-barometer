import { createQuestion, withAnswer } from "../QuestionFactory";

const NULLABLE = true;

export const data = [
    createQuestion("Q1", [
        withAnswer("A1"),
        withAnswer("A2"),
        withAnswer("A3"),
        withAnswer("AX", NULLABLE)
    ]),
    createQuestion("Q2", [
        withAnswer("A1"),
        withAnswer("A2"),
        withAnswer("A3"),
        withAnswer("AX", NULLABLE)
    ]),
    createQuestion("Q3", [
        withAnswer("A1"),
        withAnswer("A2"),
        withAnswer("A3"),
        withAnswer("AX", NULLABLE)
    ]),
];