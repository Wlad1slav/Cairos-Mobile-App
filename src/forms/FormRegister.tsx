import React, { useState } from "react";
import {IonButton, IonTitle} from '@ionic/react';
import {lockClosed, mail, warning} from "ionicons/icons";
import axios from "axios";

import AppInput from "../components/AppInput";
import AppNotification from "../components/AppNotification";

import { validateEmail, validatePassword, validatePasswordRepeat } from "../utils/validation.fields";
import {useStorage} from "../hooks/useStorage";

import storageKeys from "../config/storages.config";
import routes from "../config/routes.config";

interface FormProps {
    request: string;
}

interface FormErrors {
    email: Array<string>;
    password: Array<string>;
}

// Data for the registration request API
interface RegisterData {
    email: string;
    password: string;
    password_confirmation: string;
}

const FormRegister: React.FC<FormProps> = ({request}) => {
    // The key under which the token is stored in the storage
    const storageKey = storageKeys.token;

    // A table in local storage to store the user's authorization token
    const {setNewRows} = useStorage<string>(storageKey);

    // Data for registration
    const [data, setData] = useState<RegisterData>({
        email: '',
        password: '',
        password_confirmation: ''
    });

    // Errors during registration
    const [errors, setErrors] = useState<FormErrors>({
        email: [],
        password: []
    });

    // Storing data while filling in the fields
    const handleChange = (e: CustomEvent) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // New user registration
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        await axios.post(request, data)
            .then(response => {
                // If the registration was successful
                if (response.status === 201) {
                    setNewRows([response.data.access_token]);
                    window.location.href = '/';
                }
            })
            .catch(error => {
                // If there are problems during registration
                console.log(error)
                setErrors(error.response.data);

            });
    };

    return (
        <form onSubmit={submit}>
            <IonTitle size='large' color='dark'>Реєстрація</IonTitle>

            <div className='section-input'>
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

                {
                    errors.email.map((error) =>
                        <AppNotification icon={warning} color={"danger"}>{error}</AppNotification>
                    )
                }
            </div>

            <div className="section-input">
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

                <AppInput
                    name='password_confirmation'
                    type='password'
                    label='Підтвердіть пароль'
                    errorText='Паролі не співпадають'
                    maxlength={254}
                    icon={lockClosed}
                    validateFunction={validatePasswordRepeat}
                    onIonChange={handleChange}
                />

                {
                    errors.password.map((error) =>
                        <AppNotification icon={warning} color={"danger"}>{error}</AppNotification>
                    )
                }
            </div>

            <div className="actions">
                <IonButton
                    type='submit'
                    color='secondary'
                >Зареєструватися</IonButton>

                <a href={routes.authorization.url}>Вже зареєстровані?</a>
            </div>
        </form>
    );
};

export default FormRegister;
