import React, { useEffect, useState } from "react";
import { IonFabButton, IonIcon } from "@ionic/react";
import {bookmark, brush, checkmark, heart, heartDislike, help, pencil} from "ionicons/icons";
import axios, { AxiosResponse } from "axios";

import AppModal from "../general/AppModal";
import FormAnswerToTheQuestion from "../../forms/FormAnswerToTheQuestion";

import { useStorage } from "../../hooks/useStorage";

import {QuestionModel} from "../../models/question.model";

import storageKeys from "../../config/storages.config";
import requests from "../../config/requests.config";

import { ActionsStorage } from "../../interfaces/actions.storage";

import './AppActions.scss';
import AppAction from "./AppAction";

const AppActions: React.FC = () => {
    const [question, setQuestion] = useState<QuestionModel>({ id: -1, question: 'Завантажується...' });
    const [quote, setQuote] = useState<QuoteModel>({ id: -1, quote: 'Завантажується...' });
    const [todo, setTodo] = useState<TodoModel>({ id: -1, todo: 'Завантажується...' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { rows, setNewRows } = useStorage<ActionsStorage>(storageKeys.actions);

    useEffect(() => {
        const fetchActions = async () => {
            try {
                // HTTP request to get actions
                const response: AxiosResponse<{ quote: QuoteModel, question: QuestionModel, todo: TodoModel }> = await axios.get(requests.get.actions.all);
                const { quote, question, todo } = response.data;

                // Updating statuses based on received actions
                setQuestion(question);
                setQuote(quote);
                setTodo(todo);
                setNewRows([{ question, quote: quote, todo, date: new Date().toISOString() }]);
            } catch (error) {
                // Sets an error on failure
                setError("Не вдалося отримати дії. Будь-ласка спробуйте пізніше.");
            } finally {
                setLoading(false); // Disables the loading state
            }
        };

        // Checks if there are any saved actions and if they are current
        const actions = rows[0]?.values;
        if (actions && new Date(actions.date).toDateString() === new Date().toDateString() && actions.question.id !== -1 && actions.quote.id !== -1 && actions.todo.id !== -1) {
            setQuestion(actions.question);
            setQuote(actions.quote);
            setTodo(actions.todo);
            setLoading(false);
        } else {
            // If there are no current saved actions, makes a new request
            fetchActions();
        }
    }, [rows, setNewRows]);

    if (loading) return <div>Завантаження...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='panel--actions'>

            <AppAction label={'Цитата'} labelIcon={bookmark} text={quote.quote} button={{ icon: heart }} />

            <AppAction
                label={'Питання'}
                labelIcon={help}
                text={question.question} button={{
                    icon: pencil,
                    id: 'open-modal-write-question-answer'
                }}
                modal={{
                    trigger: 'open-modal-write-question-answer',
                    title: 'Відповісти',
                    children: <FormAnswerToTheQuestion requestLink={requests.post.actions.answer} question={question} />
                }}
            />

            <AppAction label={'Дія'} labelIcon={brush} text={todo.todo} button={{icon: checkmark}} />
        </div>
    );
}

export default AppActions;
