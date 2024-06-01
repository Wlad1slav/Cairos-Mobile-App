import React from "react";
import { IonPage } from '@ionic/react';

import AppHeader from "../components/AppHeader";
import FormRegister from "../forms/FormRegister";
import AppContent from "../components/AppContent";

import "./TabRegistration.scss";

import requests from "../config/requests.config";

const TabRegistration: React.FC = () => {
    return (
        <IonPage>
            <AppHeader />
            <AppContent requiredAuthorization={false} guest={true}>
                <FormRegister request={requests.post.auth.register} />
            </AppContent>
        </IonPage>
    );
};

export default TabRegistration;
