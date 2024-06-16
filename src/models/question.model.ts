export interface QuestionModel {
    id: number;
    question: string;
}

export function isQuestionData(value: any): value is QuestionModel {
    return (value && typeof value.id === 'number' && typeof value.question === 'string');
}