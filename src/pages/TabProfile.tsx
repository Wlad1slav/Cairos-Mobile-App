import React, {useEffect, useState} from "react";
import { IonPage } from '@ionic/react';
import {useStorage} from "../hooks/useStorage";

import AppContent from "../components/AppContent";
import AppHeader from "../components/AppHeader";

import authorizedRequest from "../utils/authorizedRequest";

interface ProfileData {
    email: string;
    name: string | null;
}

const TabProfile: React.FC = () => {

    // Obtaining a token for the request API
    const {rows} = useStorage<string>('token');

    const token = rows[0]?.values;

    const getDataRequest = 'http://127.0.0.1:8000/api/app/user/profile';

    const [profileData, setProfileData] = useState<ProfileData>({
        email: 'Loading...',
        name: null
    });

    useEffect(() => {
        if (token) {
            // When the token is received, an API request is made to the server to receive the user's token
            const response = authorizedRequest(token, getDataRequest);
            response.then((value) => {
                setProfileData(value);
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
