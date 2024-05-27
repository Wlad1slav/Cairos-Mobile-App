import {IonHeader, IonIcon, IonToolbar} from "@ionic/react";
import {hourglass} from "ionicons/icons";

import AppLogo from "./AppLogo";

import './AppHeader.scss';


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