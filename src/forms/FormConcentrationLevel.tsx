import React, {useState} from "react";
import {IonButton} from "@ionic/react";

import {warning} from "ionicons/icons";

import AppInput from "../components/general/AppInput";
import AppNotification from "../components/general/AppNotification";

import {useStorage} from "../hooks/useStorage";
import {validateConcentrationLevel} from "../utils/validation.concentration";

import routes from "../config/routes.config";
import storageKeys from "../config/storages.config";
import RequestAuthorized from "../utils/request.authorized.class";


interface Errors {
    level?: string[];
}

interface Response {
    errors?: Errors
}

const FormConcentrationLevel: React.FC<Readonly<{requestLink: string}>> = ({ requestLink }) => {
    // API access token
    const {rows} = useStorage<string>(storageKeys.token);
    const token = rows[0]?.values;

    // A method for saving a new concentration level value
    const {setNewRows} = useStorage<{level: number, dateTime: string}>(storageKeys.concentrationLevel);

    // Errors that may occur when maintaining the concentration level
    const [error, setErrors] = useState<string[] | undefined>(undefined);

    // A variable in which the concentration level entered by the user is stored
    const [data, setData] = useState<{level: number}>({
        level: -1
    });

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
            const request: RequestAuthorized = new RequestAuthorized(token);
            const response = await request.post<Response>(requestLink, data);

            if (response?.errors) {
                setErrors(response.errors.level);
            } else {
                // If the concentration level is successfully saved in the database, the concentration
                // level is saved in the local storage, after which a redirect to the main page occurs
                await setNewRows([{
                    level: data.level,
                    dateTime: new Date().toISOString(),
                }]);
                window.location.href = routes.base.url;
            }
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <img style={{
                borderRadius: "10px",
            }} src="/images/themed/concentration.webp" alt=""/>
            <p style={{
                textAlign: "center"
            }}>
                Модуль дозволяє вам налаштувати свою продуктивність і зосередженість. Ви можете вибрати рівень від
                0 до 10, де 0 означає повну відсутність концентрації, а 10 – максимальну зосередженість.
            </p>
            <form onSubmit={submit}>
                <AppInput
                    name='level'
                    type='number'
                    label='Введіть рівень своєї концентрації'
                    max={10}
                    min={0}
                    validateFunction={validateConcentrationLevel}
                    errorText='Рівень концентрації повинен бути в діапазоні 1-10'
                    onIonChange={handleChange}
                />

                <div style={{display: "flex", flexDirection: "column"}}>
                    <IonButton
                        type='submit'
                        color='secondary'
                    >Зберегти</IonButton>

                    <IonButton href='/'>Таблиця моєї концентрації</IonButton>
                </div>

                {
                    error?.map((e) =>
                        <AppNotification key={e} icon={warning} color={"warning"}>{e}</AppNotification>
                    )
                }
            </form>
        </div>
    );
}

export default FormConcentrationLevel;