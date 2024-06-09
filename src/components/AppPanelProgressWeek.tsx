import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { arrowForward } from "ionicons/icons";

import './AppPanelProgressWeek.scss';

const AppPanelProgressWeek: React.FC = () => {
    const lastDayOfWeek = 7;
    const todayDate = new Date();
    const [dayNumber, setDay] = useState(todayDate.getDay() || lastDayOfWeek);

    useEffect(() => {
        if (dayNumber === 0) setDay(lastDayOfWeek);
    }, [dayNumber]);

    const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className="panel--progress-week">
            <div className="progress">
                {daysOfWeek.map((number) => (
                    <p
                        key={number}
                        className={`${dayNumber === number ? 'today' : ''} ${dayNumber <= number ? 'left' : ''}`}
                    >
                        •
                    </p>
                ))}
            </div>
            <div className="dayer">
                <b>П'ятниця</b>
                <IonIcon icon={arrowForward} />
                <p>
                    {lastDayOfWeek + 1 - dayNumber} {lastDayOfWeek + 1 - dayNumber === 1 ? 'день' : 'дня'} до кінця тижня
                </p>
            </div>
        </div>
    );
};

export default AppPanelProgressWeek;
