import React, {useEffect, useState} from "react";
import { IonPage } from '@ionic/react';
import {useStorage} from "../hooks/useStorage";

import AppContent from "../components/AppContent";
import AppHeader from "../components/AppHeader";

import requests from "../config/requests.config";
import storageKeys from "../config/storages.config";
import RequestAuthorized from "../utils/request.authorized.class";

interface ProfileData {
    email: string;
    name: string | null;
}

function isProfileData(value: any): value is ProfileData {
    return (value && typeof value.email === 'string' && (typeof value.name === 'string' || value.name === null));
}


const TabProfile: React.FC = () => {

    // Obtaining a token for the request API
    const {rows} = useStorage<string>(storageKeys.token);

    const token = rows[0]?.values;

    const [profileData, setProfileData] = useState<ProfileData>({
        email: 'Loading...',
        name: null
    });

    useEffect(() => {
        if (token) {
            const request = new RequestAuthorized(token);
            const response = request.get(requests.get.profile.data);
            response.then((value) => {
                if (isProfileData(value)) {
                    setProfileData(value);
                }
            });
        }
    }, [token]);

    return (
        <IonPage>
            <AppHeader/>
            <AppContent>
                <h1>Профіль</h1>
                <p>{profileData.email}</p>
            </AppContent>
        </IonPage>
    );
};

export default TabProfile;
