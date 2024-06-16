import React, {useEffect, useState} from "react";
import {IonButton, IonIcon, IonPage} from '@ionic/react';
import {useStorage} from "../hooks/useStorage";

import {female, male, transgender} from "ionicons/icons";

import AppContent from "../components/AppContent";
import AppHeader from "../components/AppHeader";

import requests from "../config/requests.config";
import storageKeys from "../config/storages.config";
import routes from "../config/routes.config";
import RequestAuthorized from "../utils/request.authorized.class";

import {isProfileData, UserModel} from "../models/user.model";

import './TabProfile.scss';

const TabProfile: React.FC = () => {

    // Obtaining a token for the request API
    const {rows} = useStorage<string>(storageKeys.token);

    const token = rows[0]?.values;

    const [authorizedUser, setAuthorizedUser] = useState<UserModel>({
        email: 'Loading...',
        name: null,
        birthday_date: null,
        sex: 'dont-specify',
    });

    // Storing authorized user data
    useEffect(() => {
        if (token) {
            const request = new RequestAuthorized(token);
            const response = request.get(requests.get.profile.data);
            response.then((value) => {
                if (isProfileData<UserModel>(value)) {
                    setAuthorizedUser(value);
                }
            });
        }
    }, [token]);

    return (
        <IonPage>
                <AppHeader/>
                <AppContent>
                    <div className="profile">

                        <img className='avatar' src="/base-avatar.webp" alt=""/>

                        <div className="fields">
                            <div className="field">
                                <p className="label">пошта</p>
                                <p className="value">{authorizedUser.email}</p>
                            </div>

                            {authorizedUser.name && <div className="field">
                                <p className="label">ім'я</p>
                                <p>{authorizedUser.name}</p>
                            </div>}

                            {authorizedUser.sex !== 'dont-specify' && <div className="field">
                                <p className="label">стать</p>
                                <p className="value">
                                    {
                                        authorizedUser.sex === 'male' &&
                                        <>
                                            <IonIcon icon={male} className='male'/>
                                            Чоловік
                                        </>
                                    }

                                    {
                                        authorizedUser.sex === 'female' &&
                                        <>
                                            <IonIcon icon={female} className='female'/>
                                            Жінка
                                        </>
                                    }

                                    {
                                        authorizedUser.sex === 'other' &&
                                        <>
                                            <IonIcon icon={transgender} className='intersex'/>
                                            Нетрадиційна
                                        </>
                                    }
                                </p>
                            </div>}

                            {authorizedUser.birthday_date && <div className="field">
                                <p className="label">дата народження</p>
                                <p>{authorizedUser.birthday_date}</p>
                            </div>}
                        </div>

                        <IonButton href={routes.userPersonal.url} color='secondary'>
                            Заповнити
                        </IonButton>

                    </div>
                </AppContent>
        </IonPage>
    );
};

export default TabProfile;
