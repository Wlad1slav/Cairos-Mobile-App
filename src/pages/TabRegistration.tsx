import React from "react";
import {IonButton, IonContent, IonPage, IonTitle} from '@ionic/react';

import {lockClosed, mail} from "ionicons/icons";

import AppHeader from "../components/AppHeader";
import AppInput from "../components/AppInput";

import {validateEmail, validatePassword, validatePasswordRepeat} from "../utils/validation";

import "./TabRegistration.scss";


const TabRegistration: React.FC = () => {


    return (
        <IonPage>
            <AppHeader/>
            <IonContent fullscreen>
                <form action="/" method='post'>
                    <IonTitle size='large' color='dark'>Реєстрація</IonTitle>

                    {/*<InputEmail />*/}

                    <AppInput
                        name='email'
                        type='email'
                        label='Електрона пошта'
                        helperText='Введіть дійсну електронну адресу'
                        errorText='Недійсна електронна адреса'
                        placeholder='example@gmail.com'
                        icon={mail}
                        validateFunction={validateEmail}
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
                        />

                        <AppInput
                            name='password_repeat'
                            type='password'
                            label='Підтвердіть пароль'
                            errorText='Паролі не співпадають'
                            maxlength={254}
                            icon={lockClosed}
                            validateFunction={validatePasswordRepeat}
                        />
                    </div>

                    <div className="actions">
                        <IonButton type='submit' color='secondary'>Зареєструватися</IonButton>
                        <a href="#">Вже зареєстровані?</a>
                    </div>

                </form>
            </IonContent>
        </IonPage>
    );
};

export default TabRegistration;
