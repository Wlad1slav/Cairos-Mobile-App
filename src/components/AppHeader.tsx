import {IonHeader, IonTitle, IonToolbar} from "@ionic/react";

import AppLogo from "./AppLogo";

import './AppHeader.scss';


function AppHeader() {
    return (
        <IonHeader>
            <IonToolbar>
                <div className='header'>
                    <IonTitle>Cairosu</IonTitle>
                    <AppLogo />
                </div>
            </IonToolbar>
        </IonHeader>
    );
}

export default AppHeader;