import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import AppHeader from "../components/AppHeader";
import React from "react";

const TabRating: React.FC = () => {
    return (
        <IonPage>
            <AppHeader/>
            <IonContent fullscreen>
                <h1>Rating</h1>
            </IonContent>
        </IonPage>
    );
};

export default TabRating;
