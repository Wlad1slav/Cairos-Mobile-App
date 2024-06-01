import React from "react";
import { IonPage } from '@ionic/react';

import AppContent from "../components/AppContent";
import AppHeader from "../components/AppHeader";

const TabRating: React.FC = () => {
    return (
        <IonPage>
            <AppHeader/>
            <AppContent>
                <h1>Rating</h1>
            </AppContent>
        </IonPage>
    );
};

export default TabRating;
