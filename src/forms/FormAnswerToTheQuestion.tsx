import React, {useEffect, useState} from "react";
import {IonButton, IonTextarea} from "@ionic/react";

import {warning} from "ionicons/icons";

import AppNotification from "../components/general/AppNotification";

import {useStorage} from "../hooks/useStorage";

import storageKeys from "../config/storages.config";
import RequestAuthorized from "../utils/request.authorized.class";
import {QuestionModel} from "../models/question.model";
import DialogMessage from "../components/general/DialogMessage";
import requests from "../config/requests.config";
import {isMessagesArrayData, MessageModel} from "../models/message.model";


interface Errors {
    text?: string[];
    question_id?: string[];
}

interface Response {
    errors?: Errors,
    success?: boolean;
}

const FormAnswerToTheQuestion: React.FC<Readonly<{
    requestLink: string,
    question: QuestionModel}>
> = ({ requestLink, question }) => {

    // API access token
    const {rows} = useStorage<string>(storageKeys.token);
    const token = rows[0]?.values;

    const [error, setErrors] = useState<string[] | undefined>(undefined);

    const [data, setData] = useState<{
        text: string,
        question_id: number
    }>({ text: '', question_id: 1 });

    const [pastAnswers, setPastAnswers] = useState<MessageModel[]>([]);

    useEffect(() => {
        if (token) {
            const request = new RequestAuthorized(token);

            // Getting an array of past answers to this particular question from the server
            const response = request.get(`${requests.get.actions.answers}?questionId=${question.id}`);
            response.then((value) => {
                if (isMessagesArrayData(value)) {
                    setPastAnswers(value);
                }
            });
        }
    }, [token]);

    const handleChange = (e: CustomEvent) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (token) {
            // Storing answer
            const request: RequestAuthorized = new RequestAuthorized(token);
            const response = await request.post<Response>(requestLink, data);

            if (response?.errors) {
                setErrors(response.errors.text);
            } else {
                // If no errors occurred while storing the answer,
                // it is also set to the pastAnswers state and displayed on the screen
                setPastAnswers(prevAnswers => [
                    ...prevAnswers,
                    {
                        user_id: -1,
                        text: data.text,
                        created_at: new Date().toDateString()
                    }
                ]);
                setErrors(undefined);
            }
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <p style={{ textAlign: "center" }}>
                🤔
            </p>
            <p style={{ textAlign: "center" }}>
                {question.question}
            </p>

            <form onSubmit={submit} style={{marginBottom: "10%"}}>

                <IonTextarea
                    name='text'
                    fill={'solid'}
                    cols={30}
                    rows={10}
                    onIonChange={handleChange}
                />

                <IonButton
                    type='submit'
                    color='secondary'
                >Відповісти</IonButton>

                {
                    error?.map((e) =>
                        <AppNotification key={e} icon={warning} color={"warning"}>{e}</AppNotification>
                    )
                }
            </form>


            { (pastAnswers && pastAnswers.length > 0) &&
                <>
                    <h2 style={{textAlign: "center"}}>Ваші минулі відповіді</h2>

                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}>
                        {
                            pastAnswers.map((value: MessageModel) => {
                                return <DialogMessage message={{
                                    user_id: -1,
                                    text: value.text,
                                    created_at: new Date(value.created_at).toDateString()
                                }} key={value.created_at} />
                            })
                        }
                    </div>
                </>
            }
        </div>
    );
}

export default FormAnswerToTheQuestion;