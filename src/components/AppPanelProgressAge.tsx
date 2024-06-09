import React from "react";
import {IonIcon, IonProgressBar} from "@ionic/react";

import {hourglass} from "ionicons/icons";

import './AppPanelProgressAge.scss';

interface ProgressYearsProps {
}

const AppPanelProgressAge: React.FC<ProgressYearsProps> = () => {
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
                    9,125
                </h3>
                <p>днів до 100 років</p>
            </div>
        </div>
    );
};

export default AppPanelProgressAge;