import React from "react";

import './AppPanelProgressWeek.scss';
import {IonIcon} from "@ionic/react";
import {arrowForward} from "ionicons/icons";

const AppPanelProgressWeek: React.FC = () => {
    return (
        <div className='panel--progress-week'>
            <div className="progress">
                <p>•</p>
                <p>•</p>
                <p>•</p>
                <p>•</p>
                <p className='left today'>•</p>
                <p className='left'>•</p>
                <p className='left'>•</p>
            </div>
            <div className="dayer">
                <b>П'ятниця</b>
                <IonIcon icon={arrowForward} />
                <p>2 дня до кінця тижня</p>
            </div>
        </div>
    );
}

export default AppPanelProgressWeek;