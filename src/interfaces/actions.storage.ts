import {QuestionModel} from "../models/question.model";

export interface ActionsStorage {
    question: QuestionModel;
    goal: GoalModel;
    todo: TodoModel;
    date: string;
}