import React from "react";
import {IonIcon} from "@ionic/react";
import {accessibility, alarm, alert, apps, bag, balloon, ban, cloudyNight} from "ionicons/icons";

import './AppTimeBefore.scss';

const AppTimeBeforeYearEnd: React.FC = () => {
    return (
        <div className='hour-before-sleep'>
            <IonIcon icon={balloon} />
            <p>200 днів до кінця року</p>
        </div>
    );
}

export default AppTimeBeforeYearEnd;
