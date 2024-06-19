import React, {useEffect, useState} from "react";
import {IonButton, IonDatetime, IonDatetimeButton, IonModal, IonSelect, IonSelectOption, IonTitle} from '@ionic/react';
import {person, save, warning} from "ionicons/icons";

import AppInput from "../components/general/AppInput";
import AppNotification from "../components/general/AppNotification";

import RequestAuthorized from "../utils/request.authorized.class";
import {useStorage} from "../hooks/useStorage";

import storageKeys from "../config/storages.config";
import requests from "../config/requests.config";

import './FormPersonal.scss'
import {isProfileData, UserModel} from "../models/user.model";

/**
 * Props for the FormPersonal component.
 */
interface FormProps {
    request: string;
}

/**
 * Interface for the form input data.
 */
interface InputData {
    name: string | null;
    birthday_date: string | null;
    sex: 'male' | 'female' | 'other' | 'dont-specify';
}

/**
 * Interface for form validation errors.
 */
interface Errors {
    name?: string[];
    sex?: string[];
    birthday_date?: string[];
}

/**
 * Interface for the response structure.
 */
interface Response {
    success: boolean;
    errors?: Errors
}

/**
 * FormPersonal component for collecting user personal information.
 * @param request - The request URL for fetching user profile data.
 * @constructor
 */
const FormPersonal: React.FC<FormProps> = ({ request }) => {

    // State to hold the form data.
    const [data, setData] = useState<InputData>({
        name: '',
        birthday_date: '',
        sex: 'dont-specify'
    });

    // API access token
    const {rows} = useStorage<string>(storageKeys.token);
    const token = rows[0]?.values;

    // Processing status of new data fields
    const [success, setSuccess] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({});

    // Getting authorized user data
    useEffect(() => {
        if (token) {
            const request = new RequestAuthorized(token);
            const response = request.get(requests.get.profile.data);

            response.then((value) => {
                if (isProfileData<UserModel>(value)) {

                    const name = document.getElementsByName('name')[0] as HTMLInputElement;
                    const sex = document.getElementsByName('sex')[0] as HTMLInputElement;
                    const birthday = document.getElementsByName('birthday_date')[0] as HTMLInputElement;
                    name.value = value.name ?? '';
                    sex.value = value.sex ?? 'dont-specify';
                    birthday.value = value.birthday_date ?? '';

                    setData({
                        name: value.name,
                        birthday_date: value.birthday_date,
                        sex: value.sex ?? 'dont-specify'
                    })
                }
            });
        }
    }, [token]);

    // Storing data while filling in the fields
    const handleChange = (e: CustomEvent) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Saving the entered data
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (token) {
            const request: RequestAuthorized = new RequestAuthorized(token);
            const response: Response = await request.put<Response>(requests.pull.profile.update, data);

            if (response.errors) {
                setErrors(response.errors);
                setSuccess(false);
            } else {
                setSuccess(response.success);
                setErrors({});
            }
        }
    };

    return (
        <form onSubmit={submit}>
            <IonTitle size='large' color='dark'>Будь ласка, заповність інформацію про себе</IonTitle>

            {
                success && <AppNotification icon={save} color={"success"}>Персональні дані успішно збережено!</AppNotification>
            }

            {Object.entries(errors).map(([key, messages]) => (
                <AppNotification key={key} icon={warning} color={'danger'}>{messages?.join(', ')}</AppNotification>
            ))}

            <AppInput
                name='name'
                type='text'
                label='Як до вас звертатися'
                helperText="Ваше ім'я або псевдомним"
                placeholder='Іван Ю. Мельник'
                icon={person}
                onIonChange={handleChange}
                maxlength={255}
            />

            <div className='date-time-field'>
                <label htmlFor="birthday">Дата народження</label>
                <IonDatetimeButton datetime="birthday"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                    <IonDatetime
                        name='birthday_date'
                        id='birthday'
                        min='1900'
                        max="2015"
                        presentation="date"
                        preferWheel={true}
                        onIonChange={handleChange}
                    >
                        <span slot="title">Вкажіть дату свого народження</span>
                    </IonDatetime>
                </IonModal>
            </div>

            <IonSelect
                name='sex'
                label="Вкажіть вашу стать"
                interface="popover"
                fill="solid"
                labelPlacement="stacked"
                onIonChange={handleChange}

            >
                <IonSelectOption value='male'>👨 Чоловік</IonSelectOption>
                <IonSelectOption value='female'>👩 Жінка</IonSelectOption>
                <IonSelectOption value='other'>⚧️ Інше</IonSelectOption>
                <IonSelectOption value='dont-specify'>❓ Не хочу вказувати</IonSelectOption>
            </IonSelect>

            <div className="actions">
                <IonButton
                    type='submit'
                    color='success'
                >Зберегти</IonButton>
            </div>
        </form>
    );
};

export default FormPersonal;
