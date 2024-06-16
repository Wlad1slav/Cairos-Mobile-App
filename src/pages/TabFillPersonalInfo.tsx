import React from "react";
import { IonPage } from '@ionic/react';

import AppHeader from "../components/header/AppHeader";
import AppContent from "../components/AppContent";
import FormPersonal from "../forms/FormPersonal";

import "../forms/style.scss";

import requests from "../config/requests.config";

const TabRegistration: React.FC = () => {
    return (
        <IonPage>
            <AppHeader />
            <AppContent>
                <FormPersonal request={requests.pull.profile.update} />
            </AppContent>
        </IonPage>
    );
};

export default TabRegistration;
