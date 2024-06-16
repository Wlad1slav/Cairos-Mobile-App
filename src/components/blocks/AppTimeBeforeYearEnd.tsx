import React, {useEffect, useState} from "react";
import {IonIcon} from "@ionic/react";
import {balloon} from "ionicons/icons";

import './AppTimeBefore.scss';

const AppTimeBeforeYearEnd: React.FC = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const endOfYear = new Date(currentYear, 11, 31); // December 31 of the current year
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const [daysRemaining, setDaysRemaining] = useState(0);

    useEffect(() => {
        const remaining = Math.ceil((endOfYear.getTime() - today.getTime()) / millisecondsPerDay);
        setDaysRemaining(remaining);
    }, [endOfYear, millisecondsPerDay, today]);

    return (
        <div className='hour-before-sleep'>
            <IonIcon icon={balloon} />
            <p>{daysRemaining} днів до кінця року</p>
        </div>
    );
}

export default AppTimeBeforeYearEnd;
