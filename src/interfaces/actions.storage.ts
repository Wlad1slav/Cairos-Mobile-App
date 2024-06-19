import {QuestionModel} from "../models/question.model";

export interface ActionsStorage {
    question: QuestionModel;
    quote: QuoteModel;
    todo: TodoModel;
    date: string;
}