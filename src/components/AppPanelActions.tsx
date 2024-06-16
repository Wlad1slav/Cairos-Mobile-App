import React, { useEffect, useState } from "react";
import { IonFabButton, IonIcon } from "@ionic/react";
import { bookmark, brush, checkmark, help, pencil } from "ionicons/icons";
import axios, { AxiosResponse } from "axios";

import AppModal from "./AppModal";
import FormAnswerToTheQuestion from "../forms/FormAnswerToTheQuestion";

import { useStorage } from "../hooks/useStorage";

import {QuestionModel} from "../models/question.model";

import storageKeys from "../config/storages.config";
import requests from "../config/requests.config";

import { ActionsStorage } from "../interfaces/actions.storage";

import './AppPanelActions.scss';

const AppPanelActions: React.FC = () => {
    const [question, setQuestion] = useState<QuestionModel>({ id: -1, question: 'Завантажується...' });
    const [goal, setGoal] = useState<GoalModel>({ id: -1, goal: 'Завантажується...' });
    const [todo, setTodo] = useState<TodoModel>({ id: -1, todo: 'Завантажується...' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { rows, setNewRows } = useStorage<ActionsStorage>(storageKeys.actions);

    useEffect(() => {
        const fetchActions = async () => {
            try {
                // HTTP request to get actions
                const response: AxiosResponse<{ goal: GoalModel, question: QuestionModel, todo: TodoModel }> = await axios.get(requests.get.actions.all);
                const { goal, question, todo } = response.data;

                // Updating statuses based on received actions
                setQuestion(question);
                setGoal(goal);
                setTodo(todo);
                setNewRows([{ question, goal, todo, date: new Date().toISOString() }]);
            } catch (error) {
                // Sets an error on failure
                setError("Не вдалося отримати дії. Будь-ласка спробуйте пізніше.");
            } finally {
                setLoading(false); // Disables the loading state
            }
        };

        // Checks if there are any saved actions and if they are current
        const actions = rows[0]?.values;
        if (actions && new Date(actions.date).toDateString() === new Date().toDateString() && actions.question.id !== -1 && actions.goal.id !== -1 && actions.todo.id !== -1) {
            setQuestion(actions.question);
            setGoal(actions.goal);
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
            <div className="action">
                <div className="label">
                    <IonIcon icon={bookmark} size='large' />
                    <h3>Ціль</h3>
                </div>

                <div className='essence'>
                    {goal.goal}
                </div>

                <div></div>
            </div>

            <div className="action">
                <div className="label">
                    <IonIcon icon={help} size='large' />
                    <h3>Питання</h3>
                </div>

                <div className='essence'>
                    {question.question}
                </div>

                <IonFabButton style={{ minWidth: "40px" }} color={'dark'} size={'small'} id='open-modal-write-question-answer'>
                    <IonIcon icon={pencil}></IonIcon>
                </IonFabButton>

                <AppModal trigger={'open-modal-write-question-answer'} title={'Відповісти'}>
                    <FormAnswerToTheQuestion
                        requestLink={requests.post.actions.answer}
                        question={question}
                    />
                </AppModal>
            </div>

            <div className="action">
                <div className="label">
                    <IonIcon icon={brush} size='large' />
                    <h3>Дія</h3>
                </div>

                <div className='essence'>
                    {todo.todo}
                </div>

                <IonFabButton style={{ minWidth: "40px" }} color={'dark'} size={'small'} id='open-modal-concentration'>
                    <IonIcon icon={checkmark}></IonIcon>
                </IonFabButton>
            </div>
        </div>
    );
}

export default AppPanelActions;
