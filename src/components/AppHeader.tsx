import {IonHeader, IonIcon, IonTitle, IonToolbar} from "@ionic/react";

import AppLogo from "./AppLogo";

import './AppHeader.scss';
import {hourglass} from "ionicons/icons";


function AppHeader() {
    return (
        <IonHeader>
            <IonToolbar>
                <div className='header'>
                    <div className='app-name'>
                        <IonIcon icon={hourglass} color='primary' />
                        Cairosu
                    </div>
                    <AppLogo />
                </div>
            </IonToolbar>
        </IonHeader>
    );
}

export default AppHeader;