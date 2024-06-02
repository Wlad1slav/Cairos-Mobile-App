import React, { useState } from "react";
import { useStorage } from "../hooks/useStorage";
import { IonButton, IonTitle } from '@ionic/react';
import axios from "axios";
import {lockClosed, mail, warning} from "ionicons/icons";

import AppNotification from "../components/AppNotification";
import AppInput from "../components/AppInput";

import { validateEmail, validatePassword } from "../utils/validation";

import routes from "../config/routes.config";
import storageKeys from "../config/storages.config";

interface FormProps {
    request: string;
}

// Data for the login request API
interface LoginData {
    email: string;
    password: string;
}

const FormLogin: React.FC<FormProps> = ({ request }) => {
    // The key under which the token is stored in the storage
    const storageKey = storageKeys.token;

    // A table in local storage to store the user's authorization token
    const { setNewRows } = useStorage<string>(storageKey);

    // Data for login
    const [data, setData] = useState<LoginData>({
        email: '',
        password: ''
    });

    // Errors during login
    const [error, setError] = useState<string | null>(null);

    // Storing data while filling in the fields
    const handleChange = (e: CustomEvent) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // User login
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(request, data);
            if (response.status === 200) {
                await setNewRows([response.data.access_token]);
                window.location.href = '/';
            }
        } catch (error: any) {
            setError('Неправильна пошта або пароль');
            console.log(error);
        }
    };

    return (
        <form onSubmit={submit}>
            <IonTitle size='large' color='dark'>Авторизація</IonTitle>

            {
                error && <AppNotification icon={warning} color={"danger"}>{error}</AppNotification>
            }

            <AppInput
                name='email'
                type='email'
                label='Електрона пошта'
                helperText='Введіть дійсну електронну адресу'
                errorText='Недійсна електронна адреса'
                placeholder='example@gmail.com'
                icon={mail}
                validateFunction={validateEmail}
                onIonChange={handleChange}
            />

            <div className="password-input">
                <AppInput
                    name='password'
                    type='password'
                    label='Пароль'
                    errorText='Пароль повинен бути довше 8 символів'
                    maxlength={254}
                    counter={true}
                    minlength={8}
                    icon={lockClosed}
                    validateFunction={validatePassword}
                    onIonChange={handleChange}
                />
            </div>

            <div className="actions">
                <IonButton
                    type='submit'
                    color='secondary'
                >Увійти</IonButton>

                <a href={routes.registration.url}>Ще немає акаунту?</a>
                {/*<a href="#">Забули пароль?</a>*/}
            </div>
        </form>
    );
};

export default FormLogin;
