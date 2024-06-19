import React from "react";
import {IonButton, IonFabButton, IonIcon, IonProgressBar} from "@ionic/react";

import {hourglass} from "ionicons/icons";

import './AppProgressAge.scss';
import routes from "../../config/routes.config";

interface ProgressYearsProps {
    birthday?: string | null;
}

const AppProgressAge: React.FC<ProgressYearsProps> = ({birthday = 'Завантаження...'}) => {

    const birthdayDate = new Date(birthday ?? '');
    const todayDate = new Date();

    // The date of the 100th anniversary
    const hundredYearsDate = new Date(birthdayDate);
    hundredYearsDate.setFullYear(birthdayDate.getFullYear() + 100);

    // The difference is in milliseconds
    const timeDifference = hundredYearsDate.getTime() - todayDate.getTime();

    // Number of days
    const daysToHundredYears = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const yearsOld = todayDate.getFullYear() - birthdayDate.getFullYear();

    return (
        <div className="panel--progress-age">
            {birthday ? <>
                <IonProgressBar value={yearsOld / 100} buffer={1}></IonProgressBar>
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
                        <IonIcon icon={hourglass}/>
                        {daysToHundredYears}
                    </h3>
                    <p>днів до 100 років</p>
                </div>
            </> :
                <IonButton href={routes.userPersonal.url}>
                    Встановити дату народження
                </IonButton>
            }
        </div>
    );
};

export default AppProgressAge;