import React from "react";
import { IonPage } from '@ionic/react';

import AppHeader from "../components/AppHeader";

import FormRegister from "../forms/FormRegister";

import "./TabRegistration.scss";
import AppContent from "../components/AppContent";


const TabRegistration: React.FC = () => {


    return (
        <IonPage>
            <AppHeader />
            <AppContent requiredAuthorization={false}>
                <FormRegister request='http://127.0.0.1:8000/api/app/user/register' />
            </AppContent>
        </IonPage>
    );
};

export default TabRegistration;
