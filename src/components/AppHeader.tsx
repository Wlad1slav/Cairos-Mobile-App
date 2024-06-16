import {IonHeader, IonToolbar} from "@ionic/react";

import AppLogo from "./AppLogo";

import './AppHeader.scss';


function AppHeader() {
    return (
        <IonHeader>
            <IonToolbar>
                <div className="header">
                    <AppLogo />
                </div>
            </IonToolbar>
        </IonHeader>
    );
}

export default AppHeader;