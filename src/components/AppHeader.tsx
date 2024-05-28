import {IonHeader, IonIcon, IonToolbar} from "@ionic/react";
import {hourglass} from "ionicons/icons";

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