import React, {useState} from "react";
import {IonButton, IonFabButton, IonIcon, IonTitle} from "@ionic/react";
import AppInput from "../components/general/AppInput";
import {add, trash} from "ionicons/icons";

import './FormRoleCreate.scss';
import RequestAuthorized from "../utils/request.authorized.class";
import routes from "../config/routes.config";
import {useStorage} from "../hooks/useStorage";
import storageKeys from "../config/storages.config";

interface FormProps {
    requestLink: string;
}

interface Response {
    errors?: Errors
}

interface Errors {
    role: Array<string>;
    parts: Array<string>;
}

const FormRoleCreate: React.FC<FormProps> = ({requestLink}) => {

    const [data, setData] = useState<RoleModel>({
        id: -1,
        role: '',
        parts: []
    });

    // The state in which the new part of the role entered by the user will be recorded
    const [newPart, setNewPart] = useState<string>();

    // Stores only the name of the role in the data state
    const handleChangeRoleName = (e: CustomEvent) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Writes the name of the new role part to the newPart state
    const handleChangePart = (e: CustomEvent) => {
        const target = e.target as HTMLInputElement;
        const { value } = target;
        setNewPart(value);
    };

    // The function adds a new part to the date state stored in the new part state
    const addNewPart = () => {
        if (newPart) {
            setData(prevState => ({
                ...prevState,
                parts: [...prevState.parts, newPart]
            }));
            document.getElementById('')
        }
    };

    // The function removes the given part from the array of parts of the date state
    const deletePart = (partIndex: number) => {
        setData((prevState) => ({
            ...prevState,
            parts: prevState.parts.filter((_, index) => index !== partIndex)
        }));
    };

    // API access token
    const {rows} = useStorage<string>(storageKeys.token);
    const token = rows[0]?.values;

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (token) {
            const request: RequestAuthorized = new RequestAuthorized(token);
            const response = await request.post<Response>(requestLink, data);

            if (response?.errors) {
                console.log(response.errors);
            } else {
                window.location.href = routes.roleSelectOwn.url;
            }
        }
    };

    return (
        <form onSubmit={submit} id='createRole'>
            <IonTitle size='large' color='dark'>Нова роль</IonTitle>

            <AppInput
                name='role'
                type='text'
                label='Назва ролі'
                placeholder='Спротсмен'
                onIonChange={handleChangeRoleName}
            />

            <div className="parts">
                {
                    data.parts.map((value, index) => {
                        return <div className='part' key={index}>
                            <p>{value}</p>
                            <IonFabButton size={'small'} color={'danger'} onClick={() => deletePart(index)}>
                                <IonIcon icon={trash} />
                            </IonFabButton>
                        </div>
                    })
                }
            </div>

            <div className='add-part'>
                <div>
                    <AppInput
                        name='part'
                        type='text'
                        label='Частина ролі'
                        placeholder='Спротсмен'
                        helperText={'Що включає ця роль? '}
                        onIonChange={handleChangePart}
                    />
                </div>
                <IonFabButton onClick={addNewPart}>
                    <IonIcon icon={add} />
                </IonFabButton>
            </div>

            {
                (data.role.length > 0 && data.parts.length > 0) &&
                    <IonButton type={'submit'}>
                        Зберегти
                    </IonButton>
            }


        </form>
    )
}

export default FormRoleCreate;