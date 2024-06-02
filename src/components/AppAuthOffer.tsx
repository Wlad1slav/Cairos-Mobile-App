import React from "react";
import {IonButton, IonIcon, IonTitle} from "@ionic/react";
import {logIn} from "ionicons/icons";

import './AppAuthOffer.scss';
import routes from "../config/routes.config";

const AppAuthOffer: React.FC = () => {
    return (
        <div className="container auth-offer">
            <IonIcon icon={logIn} size={'large'} />
            <IonTitle color={'primary'}>Ви ще не авторизувалися</IonTitle>
            <div className="buttons">
                <IonButton color={'secondary'} href={routes.registration.url}>Реєстрація</IonButton>
                <IonButton color={'secondary'} fill={'outline'} href={routes.authorization.url}>Увійти</IonButton>
            </div>
        </div>
    );
}

export default AppAuthOffer;