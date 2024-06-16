import React from "react";
import {IonIcon} from "@ionic/react";
import {cloudyNight} from "ionicons/icons";

import './AppTimeBefore.scss';

const AppTimeBeforeSleep: React.FC = () => {
    return (
        <div className='hour-before-sleep'>
            <IonIcon icon={cloudyNight} />
            <p>11 годин до сну</p>
        </div>
    );
}

export default AppTimeBeforeSleep;