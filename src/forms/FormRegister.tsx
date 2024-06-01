import React, { useState } from "react";
import { IonButton, IonTitle } from '@ionic/react';
import { lockClosed, mail } from "ionicons/icons";
import axios from "axios";

import AppInput from "../components/AppInput";

import { validateEmail, validatePassword, validatePasswordRepeat } from "../utils/validation";

import {useStorage} from "../../hooks/useStorage";

interface FormProps {
    request: string;
}

// Data for the registration request API
interface RegisterData {
    email: string;
    password: string;
    password_confirmation: string;
}

const FormRegister: React.FC<FormProps> = ({request}) => {
    // The key under which the token is stored in the storage
    const storageKey = 'token';

    // A table in local storage to store the user's authorization token
    const {setNewRows} = useStorage<string>(storageKey);

    // Data for registration
    const [data, setData] = useState<RegisterData>({
        email: '',
        password: '',
        password_confirmation: ''
    });

    // Errors during registration
    const [errors, setErrors] = useState({});

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
                }
            })
            .catch(error => {
                // If there are problems during registration
                setErrors(error.response.data);
                console.log(errors);
            });
    };

    return (
        <form onSubmit={submit}>
            <IonTitle size='large' color='dark'>Реєстрація</IonTitle>

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
            </div>

            <div className="actions">
                <IonButton
                    type='submit'
                    color='secondary'
                >Зареєструватися</IonButton>

                <a href="#">Вже зареєстровані?</a>
            </div>
        </form>
    );
};

export default FormRegister;