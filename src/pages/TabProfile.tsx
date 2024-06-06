import React, {useEffect, useState} from "react";
import { IonPage } from '@ionic/react';
import {useStorage} from "../hooks/useStorage";

import AppContent from "../components/AppContent";
import AppHeader from "../components/AppHeader";

import requests from "../config/requests.config";
import storageKeys from "../config/storages.config";
import RequestAuthorized from "../utils/request.authorized.class";
import {isProfileData} from "../utils/validation.data";

const TabProfile: React.FC = () => {

    // Obtaining a token for the request API
    const {rows} = useStorage<string>(storageKeys.token);

    const token = rows[0]?.values;

    const [authorizedUser, setAuthorizedUser] = useState<UserModel>({
        email: 'Loading...',
        name: null,
        birthday_date: null,
        sex: null,
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
                <h1>Профіль</h1>
                <p>{authorizedUser.email}</p>
                <p>{authorizedUser.name}</p>
                <p>{authorizedUser.sex}</p>
                <p>{authorizedUser.birthday_date}</p>
            </AppContent>
        </IonPage>
    );
};

export default TabProfile;
