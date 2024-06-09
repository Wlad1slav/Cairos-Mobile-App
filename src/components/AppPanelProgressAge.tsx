import React from "react";
import {IonIcon, IonProgressBar} from "@ionic/react";

import {hourglass} from "ionicons/icons";

import './AppPanelProgressAge.scss';

interface ProgressYearsProps {
    birthday?: string | null;
}

const AppPanelProgressAge: React.FC<ProgressYearsProps> = ({birthday = 'Loading...'}) => {

    const birthdayDate = new Date(birthday ?? '');
    const todayDate = new Date();

    // The date of the 100th anniversary
    const hundredYearsDate = new Date(birthdayDate);
    hundredYearsDate.setFullYear(birthdayDate.getFullYear() + 100);

    // The difference is in milliseconds
    const timeDifference = hundredYearsDate.getTime() - todayDate.getTime();

    // Number of days
    const daysToHundredYears = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return (
        <div className="panel--progress-age">
            <IonProgressBar value={0.5} buffer={1}></IonProgressBar>
            <div className="years-all">
                <p>0.</p>
                <p>10</p>
                <p>20</p>
                <p>30</p>
                <p>40</p>
                <p>50</p>
                <p>60</p>
                <p>70</p>
                <p>80</p>
                <p>90</p>
                <p>00</p>
            </div>

            <div className="dayer">
                <h3>
                    <IonIcon icon={hourglass} />
                    {daysToHundredYears}
                </h3>
                <p>днів до 100 років</p>
            </div>
        </div>
    );
};

export default AppPanelProgressAge;